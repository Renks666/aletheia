"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslations} from "next-intl";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {leadDetailsSchema, leadRequestSchema} from "@/entities/lead/model/schema";
import type {LeadRequest, LeadResponse, LeadRole} from "@/entities/lead/model/types";
import {Button} from "@/shared/ui/button";
import type {ServiceItem} from "@/shared/lib/cms/types";
import type {AudienceRole, Locale} from "@/shared/lib/i18n/types";

import styles from "./lead-form-block.module.css";

type LeadFormBlockProps = {
  locale: Locale;
  serviceOptions: ServiceItem[];
  audienceLabels: Record<AudienceRole, string>;
  selectedRole: AudienceRole;
};

type LeadRequestFormValues = Omit<LeadRequest, "consent"> & {consent: boolean};
type LeadDetailsFormValues = {
  details: string;
};

const leadFormSchema = leadRequestSchema.extend({
  consent: z.boolean().refine((value) => value, {
    message: "Consent is required",
  }),
});

export function LeadFormBlock({
  locale,
  serviceOptions,
  audienceLabels,
  selectedRole,
}: LeadFormBlockProps) {
  const t = useTranslations("lead");
  const tCommon = useTranslations("common");

  const [requestId, setRequestId] = useState<string | null>(null);
  const [detailsToken, setDetailsToken] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [detailsStatus, setDetailsStatus] = useState<"idle" | "success" | "error">("idle");

  const leadForm = useForm<LeadRequestFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      locale,
      name: "",
      phone: "",
      email: "",
      role: selectedRole,
      service: serviceOptions[0]?.title ?? "",
      message: "",
      consent: false,
      source: "landing",
    },
  });

  const detailsForm = useForm<LeadDetailsFormValues>({
    resolver: zodResolver(leadDetailsSchema.pick({details: true})),
    defaultValues: {
      details: "",
    },
  });

  useEffect(() => {
    leadForm.setValue("locale", locale);
    leadForm.setValue("role", selectedRole);
  }, [leadForm, locale, selectedRole]);

  async function onSubmit(values: LeadRequestFormValues) {
    setStatus("idle");
    setRequestId(null);
    setDetailsToken(null);
    setDetailsStatus("idle");
    const payload: LeadRequest = {
      ...values,
      role: values.role as LeadRole,
      consent: true,
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as LeadResponse;

      if (!response.ok || !data.ok || !data.requestId || !data.detailsToken) {
        setStatus("error");
        return;
      }

      setRequestId(data.requestId);
      setDetailsToken(data.detailsToken);
      setStatus("success");
      leadForm.reset({...leadForm.getValues(), consent: false, message: ""});
    } catch {
      setStatus("error");
    }
  }

  async function onSubmitDetails(values: LeadDetailsFormValues) {
    if (!requestId || !detailsToken) {
      return;
    }

    setDetailsStatus("idle");

    try {
      const response = await fetch("/api/leads/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({requestId, locale, detailsToken, details: values.details}),
      });

      if (!response.ok) {
        setDetailsStatus("error");
        return;
      }

      setDetailsStatus("success");
      detailsForm.reset();
    } catch {
      setDetailsStatus("error");
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <h3>{t("title")}</h3>
        <p>{t("subtitle")}</p>
      </div>

      <form className={styles.grid} onSubmit={leadForm.handleSubmit(onSubmit)} noValidate>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="lead-name">
            {t("name")}
          </label>
          <input
            id="lead-name"
            className={`${styles.input} focus-ring`}
            {...leadForm.register("name")}
            autoComplete="name"
          />
          <p className={styles.error}>{leadForm.formState.errors.name?.message}</p>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="lead-phone">
            {t("phone")}
          </label>
          <input
            id="lead-phone"
            className={`${styles.input} focus-ring`}
            {...leadForm.register("phone")}
            autoComplete="tel"
          />
          <p className={styles.error}>{leadForm.formState.errors.phone?.message}</p>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="lead-email">
            {t("email")}
          </label>
          <input
            id="lead-email"
            className={`${styles.input} focus-ring`}
            {...leadForm.register("email")}
            autoComplete="email"
          />
          <p className={styles.error}>{leadForm.formState.errors.email?.message}</p>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="lead-role">
            {t("role")}
          </label>
          <select id="lead-role" className={`${styles.select} focus-ring`} {...leadForm.register("role")}>
            {(Object.keys(audienceLabels) as AudienceRole[]).map((role) => (
              <option key={role} value={role}>
                {audienceLabels[role]}
              </option>
            ))}
          </select>
        </div>

        <div className={`${styles.field} ${styles.fieldFull}`}>
          <label className={styles.label} htmlFor="lead-service">
            {t("service")}
          </label>
          <select
            id="lead-service"
            className={`${styles.select} focus-ring`}
            {...leadForm.register("service")}
          >
            {serviceOptions.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
          <p className={styles.error}>{leadForm.formState.errors.service?.message}</p>
        </div>

        <div className={`${styles.field} ${styles.fieldFull}`}>
          <label className={styles.label} htmlFor="lead-message">
            {t("message")}
          </label>
          <textarea
            id="lead-message"
            className={`${styles.textarea} focus-ring`}
            {...leadForm.register("message")}
          />
          <p className={styles.error}>{leadForm.formState.errors.message?.message}</p>
        </div>

        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            className="focus-ring"
            {...leadForm.register("consent")}
            aria-invalid={!!leadForm.formState.errors.consent}
          />
          <span>{t("consent")}</span>
        </label>

        <div className={styles.actions}>
          <Button type="submit" disabled={leadForm.formState.isSubmitting}>
            {t("submit")}
          </Button>
          <p
            className={`${styles.status} ${
              status === "success" ? styles.success : status === "error" ? styles.fail : ""
            }`}
          >
            {status === "success" ? t("success") : status === "error" ? t("error") : ""}
          </p>
        </div>
      </form>

      {requestId && detailsToken ? (
        <form className={styles.details} onSubmit={detailsForm.handleSubmit(onSubmitDetails)}>
          <p>{t("detailsTitle")}</p>
          <textarea
            className={`${styles.textarea} focus-ring`}
            placeholder={t("detailsPlaceholder")}
            {...detailsForm.register("details")}
          />
          <p className={styles.error}>{detailsForm.formState.errors.details?.message}</p>
          <div className={styles.actions}>
            <Button type="submit" variant="secondary" disabled={detailsForm.formState.isSubmitting}>
              {t("detailsSubmit")}
            </Button>
            <p
              className={`${styles.status} ${
                detailsStatus === "success"
                  ? styles.success
                  : detailsStatus === "error"
                    ? styles.fail
                    : ""
              }`}
            >
              {detailsStatus === "success"
                ? t("detailsSuccess")
                : detailsStatus === "error"
                  ? t("error")
                  : ""}
            </p>
          </div>
        </form>
      ) : null}

      <div className={styles.contacts}>
        <span>{tCommon("confidential")}</span>
        <span>{tCommon("responseSla")}</span>
        <a href="mailto:info@aletheia.pro">info@aletheia.pro</a>
        <a href="https://t.me/AletheiaFootball" target="_blank" rel="noreferrer">
          t.me/AletheiaFootball
        </a>
      </div>
    </div>
  );
}

