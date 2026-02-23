"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslations} from "next-intl";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {leadDetailsSchema, leadRequestSchema} from "@/entities/lead/model/schema";
import type {LeadRequest, LeadResponse, LeadRole} from "@/entities/lead/model/types";
import {Badge} from "@/shared/ui/badge";
import {Button} from "@/shared/ui/button";
import {Input} from "@/shared/ui/input";
import {Textarea} from "@/shared/ui/textarea";
import {cn} from "@/shared/lib/utils/cn";
import type {ServiceItem} from "@/shared/lib/cms/types";
import type {AudienceRole, Locale} from "@/shared/lib/i18n/types";

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

  const statusClass =
    status === "success" ? "text-[#3f7a5a]" : status === "error" ? "text-[#f3aba0]" : "text-muted";
  const detailsStatusClass =
    detailsStatus === "success"
      ? "text-[#3f7a5a]"
      : detailsStatus === "error"
        ? "text-[#f3aba0]"
        : "text-muted";

  return (
    <div className="relative overflow-hidden rounded-xl border border-line-soft bg-[image:var(--gradient-panel),url('/images/bronze-texture.svg')] bg-cover p-5 shadow-volume md:p-7">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(201,164,119,0.22),transparent_60%)] blur-xl" />
      <div className="relative">
        <div className="mb-5 grid gap-2">
          <Badge variant="accent" className="w-fit text-[0.64rem]">
            {tCommon("confidential")}
          </Badge>
          <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] leading-tight">{t("title")}</h3>
          <p className="max-w-[56ch] text-sm text-muted">{t("subtitle")}</p>
        </div>

        <form
          className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4"
          onSubmit={leadForm.handleSubmit(onSubmit)}
          noValidate
        >
          <div className="grid gap-1.5">
            <label className="text-sm text-muted" htmlFor="lead-name">
              {t("name")}
            </label>
            <Input id="lead-name" {...leadForm.register("name")} autoComplete="name" />
            <p className="min-h-4 text-xs text-[#f3aba0]">{leadForm.formState.errors.name?.message}</p>
          </div>

          <div className="grid gap-1.5">
            <label className="text-sm text-muted" htmlFor="lead-phone">
              {t("phone")}
            </label>
            <Input id="lead-phone" {...leadForm.register("phone")} autoComplete="tel" />
            <p className="min-h-4 text-xs text-[#f3aba0]">{leadForm.formState.errors.phone?.message}</p>
          </div>

          <div className="grid gap-1.5">
            <label className="text-sm text-muted" htmlFor="lead-email">
              {t("email")}
            </label>
            <Input id="lead-email" {...leadForm.register("email")} autoComplete="email" />
            <p className="min-h-4 text-xs text-[#f3aba0]">{leadForm.formState.errors.email?.message}</p>
          </div>

          <div className="grid gap-1.5">
            <label className="text-sm text-muted" htmlFor="lead-role">
              {t("role")}
            </label>
            <select
              id="lead-role"
              className="focus-ring h-11 w-full rounded-sm border border-line-soft bg-[rgba(20,20,24,0.72)] px-3 py-2 text-sm text-text"
              {...leadForm.register("role")}
            >
              {(Object.keys(audienceLabels) as AudienceRole[]).map((role) => (
                <option key={role} value={role}>
                  {audienceLabels[role]}
                </option>
              ))}
            </select>
            <p className="min-h-4 text-xs text-[#f3aba0]">{leadForm.formState.errors.role?.message}</p>
          </div>

          <div className="grid gap-1.5 md:col-span-2">
            <label className="text-sm text-muted" htmlFor="lead-service">
              {t("service")}
            </label>
            <select
              id="lead-service"
              className="focus-ring h-11 w-full rounded-sm border border-line-soft bg-[rgba(20,20,24,0.72)] px-3 py-2 text-sm text-text"
              {...leadForm.register("service")}
            >
              {serviceOptions.map((service) => (
                <option key={service.slug} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
            <p className="min-h-4 text-xs text-[#f3aba0]">{leadForm.formState.errors.service?.message}</p>
          </div>

          <div className="grid gap-1.5 md:col-span-2">
            <label className="text-sm text-muted" htmlFor="lead-message">
              {t("message")}
            </label>
            <Textarea id="lead-message" {...leadForm.register("message")} />
            <p className="min-h-4 text-xs text-[#f3aba0]">{leadForm.formState.errors.message?.message}</p>
          </div>

          <div className="md:col-span-2">
            <label className="flex items-start gap-2.5 text-sm text-muted">
              <input
                type="checkbox"
                className="focus-ring mt-0.5 h-4 w-4 accent-[var(--color-primary-600)]"
                {...leadForm.register("consent")}
                aria-invalid={!!leadForm.formState.errors.consent}
              />
              <span>{t("consent")}</span>
            </label>
            <p className="min-h-4 pt-1 text-xs text-[#f3aba0]">{leadForm.formState.errors.consent?.message}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 md:col-span-2">
            <Button type="submit" disabled={leadForm.formState.isSubmitting}>
              {t("submit")}
            </Button>
            <p className={cn("text-sm", statusClass)}>
              {status === "success" ? t("success") : status === "error" ? t("error") : ""}
            </p>
          </div>
        </form>

        {requestId && detailsToken ? (
          <form className="mt-6 grid gap-2 border-t border-line-soft pt-5" onSubmit={detailsForm.handleSubmit(onSubmitDetails)}>
            <p className="font-medium">{t("detailsTitle")}</p>
            <Textarea placeholder={t("detailsPlaceholder")} {...detailsForm.register("details")} />
            <p className="min-h-4 text-xs text-[#f3aba0]">{detailsForm.formState.errors.details?.message}</p>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button type="submit" variant="secondary" disabled={detailsForm.formState.isSubmitting}>
                {t("detailsSubmit")}
              </Button>
              <p className={cn("text-sm", detailsStatusClass)}>
                {detailsStatus === "success"
                  ? t("detailsSuccess")
                  : detailsStatus === "error"
                    ? t("error")
                    : ""}
              </p>
            </div>
          </form>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
          <span>{tCommon("confidential")}</span>
          <span>{tCommon("responseSla")}</span>
          <a href="mailto:info@aletheia.pro" className="focus-ring rounded-sm hover:text-bronze-300">
            info@aletheia.pro
          </a>
          <a
            href="https://t.me/AletheiaFootball"
            target="_blank"
            rel="noreferrer"
            className="focus-ring rounded-sm hover:text-bronze-300"
          >
            t.me/AletheiaFootball
          </a>
        </div>
      </div>
    </div>
  );
}
