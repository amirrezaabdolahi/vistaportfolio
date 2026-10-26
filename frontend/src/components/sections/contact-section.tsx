"use client";

import { useState, type FormEvent } from "react";
import { Check, Send } from "lucide-react";
import { useTranslations } from "next-intl";

const services = ["web", "design", "ai", "seo", "consulting", "other"] as const;
const stages = ["exploring", "defining", "ready", "improving"] as const;
const supports = [
  "strategy",
  "design",
  "development",
  "automation",
  "growth",
  "ongoing",
  "unsure",
] as const;
const budgets = [
  "under5k",
  "5to15k",
  "15to30k",
  "30kplus",
  "unsure",
  "preferNot",
] as const;
const timelines = [
  "asap",
  "month",
  "oneToThreeMonths",
  "exploring",
  "flexible",
] as const;

type FormValues = {
  name: string;
  email: string;
  company: string;
  website: string;
  services: string[];
  otherService: string;
  projectDescription: string;
  stage: string;
  support: string[];
  budget: string;
  timeline: string;
  additionalContext: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  company: "",
  website: "",
  services: [],
  otherService: "",
  projectDescription: "",
  stage: "",
  support: [],
  budget: "",
  timeline: "",
  additionalContext: "",
};

type FieldErrors = Partial<
  Record<"name" | "email" | "website" | "projectDescription", string>
>;

function ChoiceChip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 motion-reduce:transition-none ${selected ? "border-neutral-950 bg-neutral-950 text-white" : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"}`}
    >
      {selected && <Check aria-hidden="true" size={14} />}
      {children}
    </button>
  );
}

export function ContactSection() {
  const t = useTranslations("Contact");
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorSummary, setErrorSummary] = useState("");

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setStatus("idle");
    setErrorSummary("");
    if (
      key === "name" ||
      key === "email" ||
      key === "website" ||
      key === "projectDescription"
    ) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  };

  const toggleMulti = (key: "services" | "support", value: string) => {
    const current = values[key];
    update(
      key,
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!values.name.trim()) next.name = t("errors.required");
    if (!values.email.trim()) next.email = t("errors.required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = t("errors.email");
    if (values.website.trim()) {
      try {
        const parsed = new URL(values.website.trim());
        if (parsed.protocol !== "http:" && parsed.protocol !== "https:")
          throw new Error("Invalid protocol");
      } catch {
        next.website = t("errors.url");
      }
    }
    if (!values.projectDescription.trim())
      next.projectDescription = t("errors.required");
    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      setErrorSummary(t("errors.summary"));

      const first = Object.keys(nextErrors)[0];
      document.getElementById(first)?.focus();
      return;
    }

    setStatus("loading");
    setErrorSummary("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Contact submission failed");
      }

      setStatus("success");
      setValues(initialValues);
    } catch {
      setStatus("error");
      setErrorSummary(t("submissionUnavailable"));
    }
  };

  const fieldClass =
    "mt-2 min-h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-900/10 aria-invalid:border-red-600 aria-invalid:focus:ring-red-600/10";
  const labelClass = "text-sm font-medium text-neutral-900";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 border-t border-black/[0.04] bg-white/90 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-start gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 sm:text-sm">
              {t("eyebrow")}
            </p>
            <h2
              id="contact-heading"
              className="max-w-2xl text-balance text-4xl font-medium leading-[1.08] tracking-[-0.055em] text-neutral-950 sm:text-5xl lg:text-6xl"
            >
              {t("title")}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-neutral-600 sm:text-lg sm:leading-9">
              {t("description")}
            </p>
            <p className="mt-5 max-w-lg border-s-2 border-neutral-300 ps-4 text-sm leading-7 text-neutral-600">
              {t("reassurance")}
            </p>
            <div className="mt-12 border-t border-neutral-200 pt-6">
              <p className="text-2xl font-medium tracking-[-0.04em] text-neutral-950">
                {t("closingTitle")}
              </p>
              <p className="mt-3 max-w-md text-sm leading-7 text-neutral-600">
                {t("closingDescription")}
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="min-w-0 border-t border-neutral-200 pt-7 sm:pt-9"
          >
            <div className="mb-8">
              <h3 className="text-xl font-medium tracking-[-0.03em] text-neutral-950">
                {t("detailsTitle")}
              </h3>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="name">
                    {t("name")}{" "}
                    <span aria-hidden="true" className="text-neutral-500">
                      *
                    </span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={120}
                    value={values.name}
                    onChange={(e) => update("name", e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={fieldClass}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-sm text-red-700">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className={labelClass} htmlFor="email">
                    {t("email")}{" "}
                    <span aria-hidden="true" className="text-neutral-500">
                      *
                    </span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={fieldClass}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-sm text-red-700">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className={labelClass} htmlFor="company">
                    {t("company")}
                  </label>
                  <input
                    id="company"
                    name="company"
                    autoComplete="organization"
                    maxLength={160}
                    value={values.company}
                    onChange={(e) => update("company", e.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="website">
                    {t("website")}
                  </label>
                  <input
                    id="website"
                    name="website"
                    type="url"
                    autoComplete="url"
                    placeholder="https://"
                    maxLength={2048}
                    value={values.website}
                    onChange={(e) => update("website", e.target.value)}
                    aria-invalid={Boolean(errors.website)}
                    aria-describedby={
                      errors.website ? "website-error" : undefined
                    }
                    className={fieldClass}
                  />
                  {errors.website && (
                    <p
                      id="website-error"
                      className="mt-1.5 text-sm text-red-700"
                    >
                      {errors.website}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <fieldset className="mb-8 border-t border-neutral-200 pt-7">
              <legend className="text-xl font-medium tracking-[-0.03em] text-neutral-950">
                {t("servicesTitle")}
              </legend>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {t("servicesDescription")}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {services.map((service) => (
                  <ChoiceChip
                    key={service}
                    selected={values.services.includes(service)}
                    onClick={() => toggleMulti("services", service)}
                  >
                    {t(`services.${service}`)}
                  </ChoiceChip>
                ))}
              </div>
              {values.services.includes("other") && (
                <div className="mt-4">
                  <label className={labelClass} htmlFor="otherService">
                    {t("otherService")}
                  </label>
                  <input
                    id="otherService"
                    maxLength={200}
                    value={values.otherService}
                    onChange={(e) => update("otherService", e.target.value)}
                    className={fieldClass}
                  />
                </div>
              )}
            </fieldset>

            <div className="mb-8 border-t border-neutral-200 pt-7">
              <h3 className="text-xl font-medium tracking-[-0.03em] text-neutral-950">
                {t("projectTitle")}
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {t("projectDescriptionHelp")}
              </p>
              <label
                className={`${labelClass} mt-5 block`}
                htmlFor="projectDescription"
              >
                {t("projectDescriptionLabel")}{" "}
                <span aria-hidden="true" className="text-neutral-500">
                  *
                </span>
              </label>
              <textarea
                id="projectDescription"
                name="projectDescription"
                required
                maxLength={5000}
                rows={5}
                value={values.projectDescription}
                onChange={(e) => update("projectDescription", e.target.value)}
                aria-invalid={Boolean(errors.projectDescription)}
                aria-describedby={
                  errors.projectDescription
                    ? "projectDescription-error"
                    : undefined
                }
                placeholder={t("projectPlaceholder")}
                className={`${fieldClass} min-h-36 resize-y leading-7`}
              />
              <div className="mt-1 flex justify-end text-xs text-neutral-500">
                {values.projectDescription.length}/5000
              </div>
              {errors.projectDescription && (
                <p
                  id="projectDescription-error"
                  className="mt-1.5 text-sm text-red-700"
                >
                  {errors.projectDescription}
                </p>
              )}
            </div>

            <fieldset className="mb-8 border-t border-neutral-200 pt-7">
              <legend className="text-xl font-medium tracking-[-0.03em] text-neutral-950">
                {t("stageTitle")}
              </legend>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {t("stageDescription")}
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {stages.map((stage) => (
                  <label
                    key={stage}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm transition-colors focus-within:ring-2 focus-within:ring-neutral-900/20 ${values.stage === stage ? "border-neutral-950 bg-neutral-50" : "border-neutral-200 hover:border-neutral-400"}`}
                  >
                    <input
                      type="radio"
                      name="stage"
                      value={stage}
                      checked={values.stage === stage}
                      onChange={() => update("stage", stage)}
                      className="mt-1 accent-neutral-950"
                    />
                    <span>
                      <span className="block font-medium text-neutral-900">
                        {t(`stages.${stage}.label`)}
                      </span>
                      <span className="mt-1 block leading-6 text-neutral-600">
                        {t(`stages.${stage}.description`)}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mb-8 border-t border-neutral-200 pt-7">
              <legend className="text-xl font-medium tracking-[-0.03em] text-neutral-950">
                {t("supportTitle")}
              </legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {supports.map((item) => (
                  <ChoiceChip
                    key={item}
                    selected={values.support.includes(item)}
                    onClick={() => toggleMulti("support", item)}
                  >
                    {t(`support.${item}`)}
                  </ChoiceChip>
                ))}
              </div>
            </fieldset>

            <div className="mb-8 grid gap-8 border-t border-neutral-200 pt-7 sm:grid-cols-2">
              <fieldset>
                <legend className="text-xl font-medium tracking-[-0.03em] text-neutral-950">
                  {t("budgetTitle")}
                </legend>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  {t("budgetDescription")}
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  {budgets.map((budget) => (
                    <label
                      key={budget}
                      className="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-neutral-700"
                    >
                      <input
                        type="radio"
                        name="budget"
                        value={budget}
                        checked={values.budget === budget}
                        onChange={() => update("budget", budget)}
                        className="size-4 accent-neutral-950"
                      />
                      {t(`budgets.${budget}`)}
                    </label>
                  ))}
                </div>
                <p className="mt-3 text-xs leading-5 text-neutral-500">
                  {t("budgetNote")}
                </p>
              </fieldset>
              <fieldset>
                <legend className="text-xl font-medium tracking-[-0.03em] text-neutral-950">
                  {t("timelineTitle")}
                </legend>
                <div className="mt-4 flex flex-col gap-2">
                  {timelines.map((timeline) => (
                    <label
                      key={timeline}
                      className="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-neutral-700"
                    >
                      <input
                        type="radio"
                        name="timeline"
                        value={timeline}
                        checked={values.timeline === timeline}
                        onChange={() => update("timeline", timeline)}
                        className="size-4 accent-neutral-950"
                      />
                      {t(`timelines.${timeline}`)}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="mb-8 border-t border-neutral-200 pt-7">
              <label
                className={`${labelClass} block`}
                htmlFor="additionalContext"
              >
                {t("additionalTitle")}
              </label>
              <textarea
                id="additionalContext"
                maxLength={3000}
                rows={3}
                value={values.additionalContext}
                onChange={(e) => update("additionalContext", e.target.value)}
                placeholder={t("additionalPlaceholder")}
                className={`${fieldClass} resize-y leading-7`}
              />
            </div>

            <div aria-live="polite" aria-atomic="true" className="mb-4">
              {status === "success" && (
                <p role="status" className="text-sm leading-6 text-green-700">
                  Your project inquiry has been sent successfully.
                </p>
              )}

              {errorSummary && (
                <p
                  role="alert"
                  className={`text-sm leading-6 ${
                    status === "error" ? "text-amber-800" : "text-red-700"
                  }`}
                >
                  {errorSummary}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4 motion-reduce:transition-none sm:w-auto"
            >
              {status === "loading" ? "Sending..." : t("submit")}

              {status === "loading" ? (
                <span
                  aria-hidden="true"
                  className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none"
                />
              ) : status === "success" ? (
                <Check aria-hidden="true" size={15} />
              ) : (
                <Send aria-hidden="true" size={15} />
              )}
            </button>

            <p className="mt-3 text-xs leading-5 text-neutral-500">
              {t("submissionNote")}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
