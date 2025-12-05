import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type Body = {
  name?: string;
  email?: string;
  message?: string;
  website?: string; // honeypot
  cf_turnstile_token?: string;
};

async function verifyTurnstile(token: string, ip?: string) {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return { success: true }; // not configured => skip

  const params = new URLSearchParams();
  params.append("secret", secret);
  params.append("response", token);
  if (ip && ip !== "unknown") params.append("remoteip", ip);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    }
  );

  return res.json();
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const { name, email, message, website, cf_turnstile_token } = body;

    // Check for required fields first
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Honeypot: reject obvious bots
    if (website && website.trim() !== "") {
      console.warn("Honeypot triggered - rejecting submission");
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // Determine client IP for rate-limiting and Turnstile verification
    const ip =
      (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // If Turnstile is configured, require and verify token
    if (process.env.TURNSTILE_SECRET) {
      if (!cf_turnstile_token) {
        return NextResponse.json(
          {
            error:
              "Please complete the Turnstile captcha verification before submitting",
          },
          { status: 400 }
        );
      }

      const verified = await verifyTurnstile(cf_turnstile_token, ip);
      if (!verified || !verified.success) {
        console.warn("Turnstile verification failed", verified);
        // Return Cloudflare's verification response for debugging (temporary)
        return NextResponse.json(
          { error: "Turnstile verification failed", verify: verified },
          { status: 400 }
        );
      }
    }

    const entry = {
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
      ip,
    };

    // Attempt to send an email notification if SMTP is configured
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = process.env.SMTP_PORT;
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;
    const CONTACT_TO = process.env.CONTACT_TO; // recipient (your email)
    const CONTACT_FROM = process.env.CONTACT_FROM || SMTP_USER;

    if (SMTP_HOST && SMTP_USER && SMTP_PASS && CONTACT_TO) {
      try {
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: SMTP_PORT ? Number(SMTP_PORT) : 587,
          secure: SMTP_PORT === "465",
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
        });

        const mailResult = await transporter.sendMail({
          from: CONTACT_FROM,
          to: CONTACT_TO,
          subject: `New message from portfolio: ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
          html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
        });

        return NextResponse.json({ ok: true });
      } catch (mailErr) {
        console.error("Error sending contact email:", mailErr);
        return NextResponse.json(
          { error: "Failed to send email" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      {
        error: "Email configuration missing",
      },
      { status: 500 }
    );
  } catch (err) {
    console.error("/api/contact error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
