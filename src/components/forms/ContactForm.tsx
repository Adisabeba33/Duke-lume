"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitInquiry } from "@/app/contact/actions";
import { INQUIRY_TYPES, type ContactState } from "@/content/inquiry";

const initial: ContactState = { status: "idle" };

export function ContactForm({
  artworkSlug,
  artworkTitle,
  artworkYear,
  defaultType,
}: {
  artworkSlug?: string;
  artworkTitle?: string;
  artworkYear?: number;
  defaultType: string;
}) {
  const [state, action] = useActionState(submitInquiry, initial);
  // Repopulate from the server's echo so a failed submit never loses input.
  const v = state.values;

  if (state.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border-t border-[var(--color-line)] pt-10"
      >
        <p className="type-h3">Thank you. We’ll be in touch.</p>
        <p className="type-body mt-4 max-w-[46ch] text-[var(--color-text-secondary)]">
          Your message has reached us. We answer every inquiry personally, usually
          within a few days.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-7" noValidate>
      {/* honeypot — hidden from people, tempting to bots */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {artworkSlug && (
        <input type="hidden" name="artwork" value={artworkSlug} />
      )}

      {artworkTitle && (
        <div className="border border-[var(--color-line)] bg-[var(--color-surface)] p-4">
          <span className="type-micro text-[var(--color-text-secondary)]">
            Regarding
          </span>
          <p className="mt-1 font-[family-name:var(--font-serif)] text-[19px]">
            {artworkTitle}
            {artworkYear ? (
              <span className="text-[var(--color-text-secondary)]"> · {artworkYear}</span>
            ) : null}
          </p>
        </div>
      )}

      <Field
        id="name"
        label="Name"
        error={state.errors?.name}
        input={
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={v?.name}
            autoComplete="name"
            aria-describedby={state.errors?.name ? "name-error" : undefined}
            className="w-full border-b border-[var(--color-line)] bg-transparent pb-2 type-body outline-none focus:border-[var(--color-text-primary)]"
          />
        }
      />

      <Field
        id="email"
        label="Email"
        error={state.errors?.email}
        input={
          <input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={v?.email}
            autoComplete="email"
            aria-describedby={state.errors?.email ? "email-error" : undefined}
            className="w-full border-b border-[var(--color-line)] bg-transparent pb-2 type-body outline-none focus:border-[var(--color-text-primary)]"
          />
        }
      />

      <Field
        id="type"
        label="Inquiry type"
        error={state.errors?.type}
        input={
          <select
            id="type"
            name="type"
            defaultValue={v?.type ?? defaultType}
            required
            aria-describedby={state.errors?.type ? "type-error" : undefined}
            className="w-full cursor-pointer appearance-none border-b border-[var(--color-line)] bg-transparent pb-2 type-body outline-none focus:border-[var(--color-text-primary)]"
          >
            {INQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        }
      />

      <Field
        id="message"
        label="Message"
        error={state.errors?.message}
        input={
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            defaultValue={v?.message}
            aria-describedby={state.errors?.message ? "message-error" : undefined}
            className="w-full resize-y border-b border-[var(--color-line)] bg-transparent pb-2 type-body outline-none focus:border-[var(--color-text-primary)]"
          />
        }
      />

      {state.errors?.form && (
        <p
          role="alert"
          className="type-small border-l-2 border-[var(--color-accent)] pl-4 text-[var(--color-text-primary)]"
        >
          {state.errors.form}
        </p>
      )}

      <div className="flex flex-col gap-4 pt-2">
        <SubmitButton />
        <p className="type-small text-[var(--color-text-secondary)]">
          We use your details only to answer this inquiry. Nothing is shared, and
          we don’t add you to a mailing list.
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  input,
  error,
}: {
  id: string;
  label: string;
  input: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="type-micro text-[var(--color-text-secondary)]">
        {label}
      </label>
      {input}
      {error && (
        <p id={`${id}-error`} className="type-small text-[var(--color-accent-text)]">
          {error}
        </p>
      )}
    </div>
  );
}

/** Disabled while the action is in flight — also prevents double submission. */
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="inline-flex w-full items-center justify-center border border-[var(--color-text-primary)] px-6 py-4 type-micro transition-colors hover:bg-[var(--color-text-primary)] hover:text-[var(--color-background)] disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
    >
      {pending ? "Sending…" : "Send inquiry"}
    </button>
  );
}
