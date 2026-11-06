import { lazy, Suspense, useEffect, useRef, useState } from "react";
import socialLinks, { email } from "../data/socialLinks";
import Eyebrow from "./ui/Eyebrow";
import Magnetic from "./ui/Magnetic";
import RollText from "./ui/RollText";
import Arrow from "./ui/Arrow";

const fields = [
  { name: "fname", label: "First name", type: "text", autoComplete: "given-name", half: true },
  { name: "lname", label: "Last name", type: "text", autoComplete: "family-name", half: true },
  { name: "email", label: "Email address", type: "email", autoComplete: "email", half: true },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", half: true },
];

// reCAPTCHA pulls ~400 kB of third-party script, so it loads only as the form approaches.
const ReCAPTCHA = lazy(() => import("react-google-recaptcha"));

const STATUS_COPY = {
  verify: "Waiting for you to confirm above.",
  sending: "Sending your message…",
  sent: "Thank you — your message is on its way. I’ll be in touch shortly.",
  error: "Something went wrong. Please try again, or email me directly.",
};

const BUTTON_COPY = {
  idle: "Send message",
  verify: "Awaiting verification",
  sending: "Sending…",
  sent: "Message sent",
  error: "Try again",
};

function FieldLabel({ index, children }) {
  return (
    <span className="flex gap-3 text-[11px] uppercase tracking-[0.2em] text-mute transition-colors duration-500 group-focus-within:text-bone">
      <span className="tabular-nums text-gold/80">0{index}</span>
      {children}
    </span>
  );
}

/** Gold underline that draws in from the left while the field has focus. */
function FocusLine() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-expo group-focus-within:scale-x-100"
    />
  );
}

export default function Contact() {
  // idle → verify (reCAPTCHA panel opens) → sending → sent | error
  const [status, setStatus] = useState("idle");
  const captchaRef = useRef(null);
  const formRef = useRef(null);
  const pending = useRef(false);
  const [nearForm, setNearForm] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNearForm(true);
        observer.disconnect();
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(formRef.current);
    return () => observer.disconnect();
  }, []);

  async function send(data, captcha) {
    setStatus("sending");
    try {
      const { default: sendEmail } = await import("../services/mail");
      await sendEmail({ ...data, captcha });
      formRef.current.reset();
      setStatus("sent");
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    } finally {
      pending.current = false;
      captchaRef.current?.reset();
    }
  }

  // The browser has already validated the fields; the verification panel only opens
  // once the message is ready to go, and ticking the box sends it.
  function handleSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;
    pending.current = true;
    setStatus("verify");
  }

  // Reads the fields at send time, so edits made while the panel is open are included.
  function handleCaptcha(token) {
    if (!token || !pending.current) return;
    const form = formRef.current;
    if (!form.reportValidity()) {
      captchaRef.current?.reset();
      return;
    }
    send(Object.fromEntries(new FormData(form)), token);
  }

  const verifying = status === "verify";

  return (
    <section id="contact" className="defer-render relative px-gutter pb-20 pt-28 md:pb-28 md:pt-44">
      <Eyebrow index="06" className="mb-10">
        Contact
      </Eyebrow>

      <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
        <h2
          data-reveal="lines"
          className="max-w-[14ch] text-[13.5vw] md:text-[clamp(3rem,9.5vw,10rem)] font-medium leading-[0.88] tracking-[-0.055em]"
        >
          Let&rsquo;s build something <span className="serif">remarkable.</span>
        </h2>

        <div data-reveal="fade" className="shrink-0">
          <Magnetic strength={0.4}>
            <a
              href={`mailto:${email}`}
              className="group relative grid size-40 place-items-center overflow-hidden rounded-full bg-gold text-ink md:size-48"
            >
              <span className="absolute inset-0 translate-y-full rounded-full bg-bone transition-transform duration-700 ease-expo group-hover:translate-y-0" />
              <span className="relative flex flex-col items-center gap-2 text-sm font-medium">
                <Arrow className="size-5 transition-transform duration-700 ease-expo group-hover:rotate-45" />
                Email me
              </span>
            </a>
          </Magnetic>
        </div>
      </div>

      <div data-reveal="rule" className="mt-20 h-px w-full bg-line md:mt-28" />

      <div className="grid grid-cols-12 gap-x-4 gap-y-16 pt-14 md:pt-20">
        <aside className="col-span-12 space-y-12 md:col-span-4">
          <div data-reveal="fade">
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-mute">Availability</p>
            <p className="flex items-center gap-3 text-xl md:text-2xl">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-gold/60" />
                <span className="relative size-2 rounded-full bg-gold" />
              </span>
              Open to new projects
            </p>
          </div>
          <div data-reveal="fade">
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-mute">Email</p>
            <a href={`mailto:${email}`} className="text-xl md:text-2xl">
              <RollText>{email}</RollText>
            </a>
          </div>
          <div data-reveal="fade">
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-mute">Elsewhere</p>
            <ul className="space-y-2 text-xl">
              {socialLinks.map((s) => (
                <li key={s.id}>
                  <a href={s.link} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3">
                    <RollText>{s.title}</RollText>
                    <Arrow className="size-3 text-mute transition-transform duration-500 group-hover:rotate-45" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          data-reveal="fade"
          className="col-span-12 grid grid-cols-2 gap-x-8 gap-y-8 md:col-span-7 md:col-start-6"
        >
          {fields.map((field, i) => (
            <label key={field.name} className={`group ${field.half ? "col-span-2 sm:col-span-1" : "col-span-2"}`}>
              <FieldLabel index={i + 1}>{field.label}</FieldLabel>
              <span className="relative block">
                <input
                  className="field"
                  name={field.name}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  required
                />
                <FocusLine />
              </span>
            </label>
          ))}
          <label className="group col-span-2">
            <FieldLabel index={5}>Tell me about your project</FieldLabel>
            <span className="relative block">
              <textarea className="field min-h-[9rem] resize-none" name="message" rows={4} required />
              <FocusLine />
            </span>
          </label>

          {/* Verification panel: collapsed until the message is ready to send */}
          <div
            className={`col-span-2 grid transition-[grid-template-rows,opacity] duration-700 ease-expo ${
              verifying ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
            inert={verifying ? undefined : ""}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="flex flex-col gap-5 rounded-2xl border border-line bg-ink-2 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gold">Last step</p>
                  <p className="mt-2 max-w-[18rem] text-base leading-snug text-bone/80">
                    Confirm you&rsquo;re human &mdash; your message sends the moment you do.
                  </p>
                </div>
                {/* Crops the widget's own 1px border so it reads as part of the panel */}
                <div className="h-[74px] w-[300px] shrink-0 overflow-hidden rounded-md">
                  <div className="-m-[2px]">
                    {nearForm && (
                      <Suspense fallback={<div className="h-[78px] w-[304px] animate-pulse bg-[#222]" />}>
                        <ReCAPTCHA
                          ref={captchaRef}
                          sitekey="6LfTImUqAAAAAJ4H26Ip8-WJhaNI7uNWryGjAIVr"
                          theme="dark"
                          onChange={handleCaptcha}
                        />
                      </Suspense>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2 flex flex-col-reverse gap-6 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <p role="status" aria-live="polite" className="max-w-sm text-sm leading-relaxed text-bone/70">
              {STATUS_COPY[status] ?? "All fields are required. I usually reply by email."}
            </p>
            <Magnetic strength={0.25}>
              <button
                type="submit"
                disabled={status === "sending" || verifying}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gold px-9 py-5 text-sm font-medium text-ink transition-opacity duration-500 disabled:cursor-default disabled:opacity-60"
              >
                <span className="absolute inset-0 translate-y-full bg-bone transition-transform duration-700 ease-expo group-enabled:group-hover:translate-y-0" />
                <span className="relative">
                  <RollText>{BUTTON_COPY[status]}</RollText>
                </span>
                {status === "sent" ? (
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="relative size-3.5">
                    <path d="m3 8.5 3.2 3L13 4.5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                ) : status === "sending" ? (
                  <span className="relative size-3.5 animate-spin rounded-full border-[1.5px] border-ink/30 border-t-ink" />
                ) : (
                  <Arrow className="relative size-3.5 transition-transform duration-500 group-enabled:group-hover:rotate-45" />
                )}
              </button>
            </Magnetic>
          </div>
        </form>
      </div>
    </section>
  );
}
