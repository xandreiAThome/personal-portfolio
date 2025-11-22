import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
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

    const dir = path.join(process.cwd(), "data");
    await fs.mkdir(dir, { recursive: true });

    // Simple file-backed rate limiting per IP
    const RATE_WINDOW = Number(process.env.RATE_LIMIT_WINDOW || "3600"); // seconds
    const RATE_MAX = Number(process.env.RATE_LIMIT_MAX || "10");
    const rateFile = path.join(dir, "rate-limit.json");
    let rateObj: Record<string, number[]> = {};
    try {
      const raw = await fs.readFile(rateFile, "utf8");
      rateObj = JSON.parse(raw) as Record<string, number[]>;
    } catch (e) {
      rateObj = {};
    }

    const now = Math.floor(Date.now() / 1000);
    const windowStart = now - RATE_WINDOW;
    const entries = (rateObj[ip] || []).filter((ts) => ts >= windowStart);
    if (entries.length >= RATE_MAX) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    entries.push(now);
    rateObj[ip] = entries;
    try {
      await fs.writeFile(rateFile, JSON.stringify(rateObj, null, 2), "utf8");
    } catch (e) {
      console.warn("Failed to write rate-limit file", e);
    }

    const file = path.join(dir, "contact-submissions.json");

    let arr: Array<Record<string, any>> = [];
    try {
      const existing = await fs.readFile(file, "utf8");
      arr = JSON.parse(existing);
      if (!Array.isArray(arr)) arr = [];
    } catch (e) {
      arr = [];
    }

    const entry = {
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
      ip,
    };

    arr.push(entry);

    await fs.writeFile(file, JSON.stringify(arr, null, 2), "utf8");

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

        return NextResponse.json({ ok: true, info: mailResult });
      } catch (mailErr) {
        console.error("Error sending contact email:", mailErr);
        // Return an error response, but keep the submission saved on disk
        return NextResponse.json(
          { error: "Failed to send email" },
          { status: 500 }
        );
      }
    }

    // SMTP not configured; return success because submission was saved
    return NextResponse.json({
      ok: true,
      warning: "SMTP not configured; message saved only.",
    });
  } catch (err) {
    console.error("/api/contact error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
