import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request) {
  try {
    const { name, email, subject, message, turnstileToken } = await request.json();

    // Basic server-side validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields (name, email, subject, message) are required.' },
        { status: 400 }
      );
    }

    // Verify Cloudflare Turnstile token if secret key is configured
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      if (!turnstileToken) {
        return NextResponse.json(
          { error: 'Turnstile verification token is missing. Please complete the verification.' },
          { status: 400 }
        );
      }

      const turnstileVerifyRes = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            secret: turnstileSecret,
            response: turnstileToken,
          }),
        }
      );

      const turnstileData = await turnstileVerifyRes.json();
      if (!turnstileData.success) {
        return NextResponse.json(
          { error: 'Failed captcha verification. Please try again.' },
          { status: 400 }
        );
      }
    }

    // Check Resend API key
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'Resend API key is not configured on the server.' },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    // Destination email: default to your email or CONTACT_RECEIVER_EMAIL env
    const toEmail = process.env.CONTACT_RECEIVER_EMAIL || 'arvinpaoloq.diaz@gmail.com';
    // By default, Resend free accounts allow sending from onboarding@resend.dev unless a custom domain is verified
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `[Portfolio Contact] ${subject} - from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">New Message from Portfolio</h2>
          <p style="margin: 12px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin: 12px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p style="margin: 12px 0;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <div style="margin-top: 20px; padding: 15px; background: #f8fafc; border-radius: 6px; border-left: 4px solid #3b82f6;">
            <strong style="display: block; margin-bottom: 8px; color: #475569;">Message:</strong>
            <p style="white-space: pre-wrap; margin: 0; color: #1e293b; line-height: 1.5;">${escapeHtml(message)}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to send message via Resend.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred while sending the message.' },
      { status: 500 }
    );
  }
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
