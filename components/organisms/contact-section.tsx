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

  const socialLinks = [
    {
      label: "GitHub",
      url: "https://github.com/xandreiAThome",
      icon: <FaGithub />,
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/ellexandrei-esponilla/",
      icon: <CiLinkedin />,
    },
    {
      label: "Email",
      url: "mailto:xandrei37@gmail.com",
      icon: <MdOutlineEmail />,
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 px-6 bg-linear-to-b from-background/20 to-background"
    >
      <div className="max-w-4xl mx-auto">
        <H2 className="mb-6">Let's Connect</H2>
        <Paragraph className="mb-12 text-lg text-foreground/75">
          Interested in collaborating or want to discuss your next cosmic
          project? Feel free to reach out!
        </Paragraph>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 tracking-tight">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-card border border-border/60 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 tracking-tight">
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-card border border-border/60 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 tracking-tight">
                Message
              </label>
              <textarea
                placeholder="Your message..."
                rows={4}
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-card border border-border/60 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary transition-colors resize-none"
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
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm tracking-tight disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {feedback && (
              <p
                role="status"
                className={`text-sm mt-2 ${
                  status === "success" ? "text-green-500" : "text-red-400"
                }`}
              >
                {feedback}
              </p>
            )}
          </form>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-6 tracking-tight">
              Connect With Me
            </h3>
            {socialLinksData.map((link) => (
              <a
                key={link.label}
                href={link.url}
                className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border/60 hover:border-primary/80 transition-colors group"
              >
                <span className="flex-1 text-sm">{link.label}</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  {iconMap[link.icon]}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
