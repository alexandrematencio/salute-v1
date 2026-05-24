"use client";

import { useState } from "react";

/**
 * Formulaire de contact — démo statique (pas de Server Action câblée).
 * À brancher en production sur une Server Action + zod + rate-limit (Upstash)
 * + sender (Resend / Postmark). Voir CLAUDE.md §2 "Server Actions".
 *
 * Conforme RGPD :
 * - case de consentement décochée par défaut (CNIL)
 * - lien explicite vers la politique de confidentialité
 * - inputmode + autocomplete corrects pour mobile
 * - aria-describedby pour erreurs
 */
export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const form = e.currentTarget;
    const data = new FormData(form);

    const newErrors: Record<string, string> = {};
    if (!data.get("nom")) newErrors.nom = "Veuillez renseigner votre nom.";
    if (!data.get("email") || !String(data.get("email")).includes("@"))
      newErrors.email = "Veuillez renseigner une adresse email valide.";
    if (!data.get("message")) newErrors.message = "Veuillez renseigner un message.";
    if (!data.get("consent")) newErrors.consent = "Le consentement est requis pour traiter votre demande.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    // Démo — en production : await fetch('/api/contact', { method: 'POST', body: data })
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
    form.reset();
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-salute-green/40 bg-salute-green/10 p-8 text-center"
      >
        <h2 className="font-display text-2xl font-semibold text-salute-green">
          Message bien reçu&nbsp;!
        </h2>
        <p className="mt-3 text-base leading-relaxed">
          Merci pour votre message. Nous vous répondrons dans les meilleurs délais — généralement
          sous 24 à 48&nbsp;heures (hors week-end).
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="touch-target mt-6 inline-flex items-center rounded-md bg-salute-green px-4 py-2 text-sm font-medium text-salute-cream hover:opacity-90"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-2xl border border-salute-stone/20 bg-white p-6 dark:bg-salute-ink/40 sm:p-8">
      <h2 className="font-display text-2xl font-semibold">Écrivez-nous</h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom" name="nom" required autoComplete="family-name" error={errors.nom} />
        <Field label="Prénom" name="prenom" autoComplete="given-name" />
      </div>

      <Field label="E-mail" name="email" type="email" required autoComplete="email" inputMode="email" error={errors.email} />

      <div>
        <label htmlFor="sujet" className="block text-sm font-medium">
          Sujet
        </label>
        <select
          id="sujet"
          name="sujet"
          className="mt-1 block w-full rounded-md border border-salute-stone/30 bg-white px-3 py-2 text-sm dark:bg-salute-ink/60"
          defaultValue="info"
        >
          <option value="info">Demande d'informations</option>
          <option value="devis">Demande de devis (traiteur, événement)</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message <span aria-hidden className="text-salute-terracotta">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-err" : undefined}
          className="mt-1 block w-full rounded-md border border-salute-stone/30 bg-white px-3 py-2 text-sm dark:bg-salute-ink/60"
        />
        {errors.message && (
          <p id="message-err" className="mt-1 text-sm text-salute-terracotta">
            {errors.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm leading-relaxed">
          <input
            type="checkbox"
            name="consent"
            className="mt-1 h-4 w-4"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-err" : undefined}
          />
          <span>
            J'accepte que mes données soient utilisées pour traiter ma demande. Pour en savoir plus,
            consultez notre{" "}
            <a href="/politique-de-confidentialite" className="underline">
              politique de confidentialité
            </a>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="consent-err" className="mt-1 text-sm text-salute-terracotta">
            {errors.consent}
          </p>
        )}
      </div>

      {/* Honeypot — invisible aux humains, attire les bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <button
        type="submit"
        disabled={submitting}
        className="touch-target inline-flex items-center rounded-md bg-salute-green px-5 py-3 text-sm font-medium text-salute-cream hover:opacity-90 disabled:opacity-60"
      >
        {submitting ? "Envoi en cours…" : "Envoyer"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  inputMode,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
  error?: string;
}) {
  const id = `field-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}{" "}
        {required && (
          <span aria-hidden className="text-salute-terracotta">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="mt-1 block w-full rounded-md border border-salute-stone/30 bg-white px-3 py-2 text-sm dark:bg-salute-ink/60"
      />
      {error && (
        <p id={`${id}-err`} className="mt-1 text-sm text-salute-terracotta">
          {error}
        </p>
      )}
    </div>
  );
}
