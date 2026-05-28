import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",   // free tier sender
      to: "hardik5053w@gmail.com",                         // your inbox
      replyTo: email,
      subject: `New message from ${name} — Portfolio`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#0f0f0f;color:#e5e7eb;border-radius:12px;">
          <h2 style="color:#f59e0b;margin:0 0 24px;">New Portfolio Message</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;color:#9ca3af;width:80px;vertical-align:top;">Name</td>
              <td style="padding:8px 0;font-weight:600;">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#9ca3af;vertical-align:top;">Email</td>
              <td style="padding:8px 0;">
                <a href="mailto:${email}" style="color:#f59e0b;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#9ca3af;vertical-align:top;">Message</td>
              <td style="padding:8px 0;white-space:pre-wrap;">${message}</td>
            </tr>
          </table>
          <p style="margin:24px 0 0;font-size:12px;color:#4b5563;">
            Sent from your portfolio contact form · Reply directly to this email to respond.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[/api/contact] Resend error:", error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/contact]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
