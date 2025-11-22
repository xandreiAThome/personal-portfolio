"use client";

import type React from "react";
import { CiLinkedin } from "react-icons/ci";
import { H2 } from "@/components/atoms/heading";
import { Paragraph } from "@/components/atoms/text";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formState);
    setFormState({ name: "", email: "", message: "" });
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
            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm tracking-tight"
            >
              Send Message
            </button>
          </form>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-6 tracking-tight">
              Connect With Me
            </h3>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border/60 hover:border-primary/80 transition-colors group"
              >
                <span className="flex-1 text-sm">{link.label}</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  {link.icon}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
