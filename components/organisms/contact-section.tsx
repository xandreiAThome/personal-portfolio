"use client";

import type React from "react";
import { CiLinkedin } from "react-icons/ci";
import { H2 } from "@/components/atoms/heading";
import { Paragraph } from "@/components/atoms/text";
import { useState, useEffect, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import socialLinksData from "@/data/social-links.json";

const iconMap: Record<string, React.ReactNode> = {
  FaGithub: <FaGithub />,
  CiLinkedin: <CiLinkedin />,
  MdOutlineEmail: <MdOutlineEmail />,
};

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot
  });

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const [feedback, setFeedback] = useState<string | null>(null);

  const turnstileRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY;
    if (!siteKey) return;

    function renderWidget() {
      try {
        if ((window as any).turnstile && turnstileRef.current) {
          // render returns an integer widget id
          widgetIdRef.current = (window as any).turnstile.render(
            turnstileRef.current,
            { sitekey: siteKey }
          );
        }
      } catch (e) {
        console.warn("Turnstile render error", e);
      }
    }

    if ((window as any).turnstile) {
      renderWidget();
    } else {
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      s.async = true;
      s.defer = true;
      s.onload = renderWidget;
      document.head.appendChild(s);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setFeedback(null);
    // Cloudflare Turnstile token (if configured)
    try {
      const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY;
      let token: string | null = null;

      if (siteKey && (window as any).turnstile && widgetIdRef.current != null) {
        try {
          token = (window as any).turnstile.getResponse(widgetIdRef.current);
        } catch (e) {
          console.warn("Turnstile getResponse error", e);
        }
      }

      const payload = { ...formState, cf_turnstile_token: token };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setFeedback(data?.error || "Failed to send message");
        return;
      }

      setStatus("success");
      setFeedback("Message sent — thanks! I will get back to you soon.");
      setFormState({ name: "", email: "", message: "", website: "" });

      // reset Turnstile widget if available
      try {
        if ((window as any).turnstile && widgetIdRef.current != null) {
          (window as any).turnstile.reset(widgetIdRef.current);
        }
      } catch (e) {
        // ignore reset errors
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setFeedback("Network error — please try again later.");
    }
  };

  return (
    <section
      id="contact"
      className="py-32 px-6 bg-linear-to-b from-background/40 to-background"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-primary tracking-widest text-[10px] uppercase font-mono">Engagement</span>
          <div className="w-8 h-px bg-white/10" />
        </div>
        <H2 className="mb-6 text-4xl md:text-5xl tracking-tighter">Let's Connect</H2>
        <Paragraph className="mb-16 text-lg md:text-xl text-foreground/60 max-w-2xl leading-relaxed">
          Interested in collaborating or want to discuss your next cosmic
          project? Feel free to reach out via the form or social links.
        </Paragraph>

        <div className="grid md:grid-cols-[1.5fr_1fr] gap-12 md:gap-20">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-mono tracking-widest text-foreground/40 px-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-mono tracking-widest text-foreground/40 px-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-mono tracking-widest text-foreground/40 px-1">
                Message
              </label>
              <textarea
                placeholder="How can I help you?"
                rows={5}
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all resize-none"
                required
              />
            </div>
            
            {/* Honeypot field - hide from users but present for bots to fill */}
            <div className="hidden" aria-hidden>
              <label htmlFor="website" className="sr-only">
                Website
              </label>
              <input
                id="website"
                name="website"
                type="text"
                autoComplete="off"
                tabIndex={-1}
                value={formState.website}
                onChange={(e) =>
                  setFormState({ ...formState, website: e.target.value })
                }
                className="opacity-0 h-0 w-0"
              />
            </div>

            {/* Cloudflare Turnstile widget placeholder */}
            <div>
              <div id="cf-turnstile" ref={turnstileRef} />
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full sm:w-max px-10 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all hover:scale-[1.02] font-semibold text-sm tracking-tight disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
              >
                {status === "sending" ? "Dispatching..." : "Send Message"}
              </button>

              {feedback && (
                <p
                  role="status"
                  className={`text-sm px-1 font-medium ${
                    status === "success" ? "text-secondary" : "text-destructive"
                  }`}
                >
                  {feedback}
                </p>
              )}
            </div>
          </form>

          {/* Social Links */}
          <div className="space-y-8">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/40">
              Orbital Links
            </h3>
            <div className="flex flex-col gap-4">
              {socialLinksData.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-white/[0.08] transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <span className="p-2.5 rounded-lg bg-white/5 text-primary group-hover:scale-110 transition-transform">
                      {iconMap[link.icon]}
                    </span>
                    <span className="text-sm font-medium tracking-tight group-hover:text-primary transition-colors">{link.label}</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary transition-colors shadow-[0_0_8px_transparent] group-hover:shadow-primary/50" />
                </a>
              ))}
            </div>
            
            <div className="pt-8 border-t border-white/5">
              <p className="text-[10px] text-foreground/30 font-mono leading-loose">
                LOC: MANILA, PH <br/>
                TIME: {new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })} PHT
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

