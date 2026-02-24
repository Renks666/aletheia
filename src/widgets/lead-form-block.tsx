"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslations} from "next-intl";
import {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {ChevronDown} from "lucide-react";

import {leadDetailsSchema, leadRequestSchema} from "@/entities/lead/model/schema";
import type {LeadRequest, LeadResponse, LeadRole} from "@/entities/lead/model/types";
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

type SelectOption = {
  value: string;
  label: string;
};

const leadFormSchema = leadRequestSchema.extend({
  consent: z.boolean().refine((value) => value, {
    message: "Consent is required",
  }),
});

type FormSelectProps = {
  id: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  ariaLabel: string;
  placeholder?: string;
};

function FormSelect({id, value, options, onChange, ariaLabel, placeholder = "-"}: FormSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const selected = options.find((item) => item.value === value);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="relative" ref={rootRef}>
      <button
        id={id}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={cn(
          "focus-ring h-10 w-full rounded-sm border border-line-strong bg-[linear-gradient(160deg,rgba(30,33,39,0.92),rgba(20,20,24,0.9))] px-3 pr-9 text-left text-sm shadow-sm transition-[border-color,box-shadow,background-color] duration-200 hover:border-[rgba(201,164,119,0.58)] hover:bg-[linear-gradient(160deg,rgba(36,39,46,0.94),rgba(22,20,30,0.92))] focus-visible:border-bronze-300 md:h-11",
          selected ? "text-text" : "text-muted",
        )}
        onClick={() => setIsOpen((open) => !open)}
      >
        {selected?.label ?? placeholder}
      </button>
      <ChevronDown
        className={`pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-bronze-300 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        aria-hidden
      />

      {isOpen ? (
        <ul
          role="listbox"
          className="absolute z-30 mt-1 max-h-64 w-full overflow-auto rounded-sm border border-line-strong bg-[linear-gradient(170deg,rgba(29,31,39,0.97),rgba(17,16,24,0.98))] p-1 shadow-[0_16px_34px_rgba(0,0,0,0.45)]"
        >
          {options.map((option) => {
            const isActive = option.value === value;

            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  className={`focus-ring w-full rounded-sm px-3 py-2 text-left text-sm transition-colors ${isActive ? "bg-[color:color-mix(in_srgb,var(--color-primary-800)_64%,transparent)] text-text" : "text-muted hover:bg-[color:color-mix(in_srgb,var(--color-primary-800)_44%,transparent)] hover:text-text"}`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export function LeadFormBlock({
  locale,
  serviceOptions,
  audienceLabels,
}: LeadFormBlockProps) {
  const t = useTranslations("lead");
  const tCommon = useTranslations("common");
  const otherServiceLabel = locale === "ru" ? "Другое" : "Other";
  const otherRoleLabel = locale === "ru" ? "Другая" : "Other";

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
      role: "" as LeadRole,
      service: "",
      message: "",
      consent: false,
      source: "landing",
      sourceDetail: "",
      landingVariant: "v2-conversion",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      utmTerm: "",
      utmContent: "",
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
  }, [leadForm, locale]);

  const roleValue = leadForm.watch("role");
  const serviceValue = leadForm.watch("service");
  const roleOptions: SelectOption[] = (Object.keys(audienceLabels) as AudienceRole[]).map((role) => ({
    value: role,
    label: audienceLabels[role],
  }));
  roleOptions.push({value: "other", label: otherRoleLabel});
  const serviceOptionsWithOther: SelectOption[] = [
    ...serviceOptions.map((service) => ({value: service.title, label: service.title})),
    {value: otherServiceLabel, label: otherServiceLabel},
  ];

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    leadForm.setValue("sourceDetail", document.referrer || "");
    leadForm.setValue("utmSource", params.get("utm_source") ?? "");
    leadForm.setValue("utmMedium", params.get("utm_medium") ?? "");
    leadForm.setValue("utmCampaign", params.get("utm_campaign") ?? "");
    leadForm.setValue("utmTerm", params.get("utm_term") ?? "");
    leadForm.setValue("utmContent", params.get("utm_content") ?? "");
  }, [leadForm]);

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
      leadForm.reset({
        ...leadForm.getValues(),
        role: "" as LeadRole,
        service: "",
        consent: false,
        message: "",
        email: "",
      });
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
    <div className="relative overflow-hidden rounded-xl border border-line-soft bg-[image:var(--gradient-panel),url('/images/bronze-texture.svg')] bg-cover p-3 shadow-volume md:p-5">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(201,164,119,0.22),transparent_60%)] blur-xl" />
      <div className="relative">
        <div className="mb-2 grid gap-0.5 md:mb-3 md:gap-1">
          <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] leading-tight">{t("title")}</h3>
          <p className="max-w-[56ch] text-sm text-muted">{t("subtitle")}</p>
        </div>

        <form
          className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3"
          onSubmit={leadForm.handleSubmit(onSubmit)}
          noValidate
        >
          <div className="grid gap-1">
            <label className="text-sm text-muted" htmlFor="lead-name">
              {t("name")}
            </label>
            <Input id="lead-name" className="h-10 py-1.5 md:h-11 md:py-2" {...leadForm.register("name")} autoComplete="name" />
            <p className="min-h-3 text-xs text-[#f3aba0] md:min-h-4">{leadForm.formState.errors.name?.message}</p>
          </div>

          <div className="grid gap-1">
            <label className="text-sm text-muted" htmlFor="lead-phone">
              {t("phone")}
            </label>
            <Input
              id="lead-phone"
              className="h-10 py-1.5 md:h-11 md:py-2"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              pattern="\\+?[0-9]*"
              maxLength={25}
              {...leadForm.register("phone", {
                onChange: (event) => {
                  const raw = String(event.target.value ?? "");
                  const hasLeadingPlus = raw.startsWith("+");
                  const digits = raw.replace(/\D+/g, "");
                  event.target.value = hasLeadingPlus ? `+${digits}` : digits;
                },
              })}
            />
            <p className="min-h-3 text-xs text-[#f3aba0] md:min-h-4">{leadForm.formState.errors.phone?.message}</p>
          </div>

          <div className="grid gap-1">
            <label className="text-sm text-muted" htmlFor="lead-email">
              {t("email")} {locale === "ru" ? "(опционально)" : "(optional)"}
            </label>
            <Input
              id="lead-email"
              className="h-10 py-1.5 md:h-11 md:py-2"
              {...leadForm.register("email")}
              autoComplete="email"
            />
            <p className="min-h-3 text-xs text-[#f3aba0] md:min-h-4">{leadForm.formState.errors.email?.message}</p>
          </div>

          <div className="grid gap-1">
            <label className="text-sm text-muted" htmlFor="lead-role">
              {t("role")}
            </label>
            <FormSelect
              id="lead-role"
              ariaLabel={t("role")}
              value={roleValue}
              options={roleOptions}
              placeholder="-"
              onChange={(value) =>
                leadForm.setValue("role", value as LeadRole, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                })
              }
            />
            <p className="min-h-3 text-xs text-[#f3aba0] md:min-h-4">{leadForm.formState.errors.role?.message}</p>
          </div>

          <div className="grid gap-1 md:col-span-2">
            <label className="text-sm text-muted" htmlFor="lead-service">
              {t("service")}
            </label>
            <FormSelect
              id="lead-service"
              ariaLabel={t("service")}
              value={serviceValue}
              options={serviceOptionsWithOther}
              placeholder="-"
              onChange={(value) =>
                leadForm.setValue("service", value, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                })
              }
            />
            <p className="min-h-3 text-xs text-[#f3aba0] md:min-h-4">{leadForm.formState.errors.service?.message}</p>
          </div>

          <div className="grid gap-1 md:col-span-2">
            <label className="text-sm text-muted" htmlFor="lead-message">
              {t("message")}
            </label>
            <Textarea
              id="lead-message"
              className="min-h-[92px] py-1.5 md:min-h-[112px] md:py-2"
              {...leadForm.register("message")}
            />
            <p className="min-h-3 text-xs text-[#f3aba0] md:min-h-4">{leadForm.formState.errors.message?.message}</p>
          </div>

          <div className="md:col-span-2">
            <label className="flex items-start gap-2 text-sm text-muted md:gap-2.5">
              <input
                type="checkbox"
                className="focus-ring mt-0.5 h-4 w-4 accent-[var(--color-primary-600)]"
                {...leadForm.register("consent")}
                aria-invalid={!!leadForm.formState.errors.consent}
              />
              <span>{t("consent")}</span>
            </label>
            <p className="min-h-3 pt-0.5 text-xs text-[#f3aba0] md:min-h-4 md:pt-1">{leadForm.formState.errors.consent?.message}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 md:col-span-2">
            <Button type="submit" disabled={leadForm.formState.isSubmitting}>
              {t("submit")}
            </Button>
            <p className={cn("text-sm", statusClass)} role="status" aria-live="polite">
              {status === "success" ? t("success") : status === "error" ? t("error") : ""}
            </p>
          </div>
        </form>

        {status === "success" ? (
          <p className="mt-1.5 text-sm text-muted md:mt-2" role="status" aria-live="polite">
            {t("nextSteps")}
          </p>
        ) : null}

        {requestId && detailsToken ? (
          <form className="mt-4 grid gap-2 border-t border-line-soft pt-4" onSubmit={detailsForm.handleSubmit(onSubmitDetails)}>
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

        <div className="mt-3 inline-flex flex-wrap items-center gap-1.5 rounded-full border border-line-soft bg-[color:color-mix(in_srgb,var(--color-surface-900)_78%,transparent)] px-2.5 py-1 text-xs text-muted md:mt-4 md:gap-2 md:px-3 md:py-1.5">
          <span>{tCommon("confidential")}</span>
          <span aria-hidden className="text-bronze-300/80">{"\u2022"}</span>
          <span>{tCommon("responseSla")}</span>
        </div>
      </div>
    </div>
  );
}

