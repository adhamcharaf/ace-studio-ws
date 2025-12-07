import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Email recipient - can be changed in environment variables
const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL || "adhamch123@gmail.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

// Map project types to readable labels
const projectTypeLabels: Record<string, string> = {
  "site-vitrine": "Site Vitrine",
  "projet-ambitieux": "Projet Ambitieux",
  "identite-digitale": "Identite Digitale",
  "autre": "Autre",
};

// Map budget options to readable labels
const budgetLabels: Record<string, string> = {
  "a-definir": "A definir",
  "less-500k": "< 500 000 FCFA",
  "500k-1m": "500 000 - 1 000 000 FCFA",
  "1m-2m": "1 000 000 - 2 000 000 FCFA",
  "more-2m": "> 2 000 000 FCFA",
};

function createEmailHTML(data: ContactFormData): string {
  const projectType = projectTypeLabels[data.projectType] || data.projectType;
  const budget = data.budget ? (budgetLabels[data.budget] || data.budget) : "Non specifie";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nouveau message - ACE STUDIO</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Helvetica Neue', Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);">
                <!-- Header -->
                <tr>
                  <td style="background-color: #0A0A0A; padding: 32px 40px; text-align: center;">
                    <h1 style="color: #C9A050; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 2px;">
                      ACE STUDIO
                    </h1>
                    <p style="color: #888888; margin: 8px 0 0 0; font-size: 14px;">
                      Nouveau message de contact
                    </p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <!-- Greeting -->
                    <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                      Vous avez recu un nouveau message depuis le formulaire de contact.
                    </p>

                    <!-- Info Box -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafafa; border-radius: 8px; margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 24px;">
                          <!-- Name -->
                          <p style="margin: 0 0 16px 0;">
                            <span style="color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 4px;">Nom</span>
                            <span style="color: #333333; font-size: 16px; font-weight: 600;">${data.name}</span>
                          </p>

                          <!-- Email -->
                          <p style="margin: 0 0 16px 0;">
                            <span style="color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 4px;">Email</span>
                            <a href="mailto:${data.email}" style="color: #C9A050; font-size: 16px; text-decoration: none;">${data.email}</a>
                          </p>

                          <!-- Project Type -->
                          <p style="margin: 0 0 16px 0;">
                            <span style="color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 4px;">Type de projet</span>
                            <span style="color: #333333; font-size: 16px;">${projectType}</span>
                          </p>

                          <!-- Budget -->
                          <p style="margin: 0;">
                            <span style="color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 4px;">Budget</span>
                            <span style="color: #333333; font-size: 16px;">${budget}</span>
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Message -->
                    <div style="background-color: #fff9eb; border-left: 4px solid #C9A050; padding: 20px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
                      <p style="color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0;">Message</p>
                      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${data.message}</p>
                    </div>

                    <!-- CTA -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center">
                          <a href="mailto:${data.email}" style="display: inline-block; background-color: #C9A050; color: #0A0A0A; padding: 14px 32px; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 50px;">
                            Repondre a ${data.name}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #fafafa; padding: 24px 40px; text-align: center; border-top: 1px solid #eeeeee;">
                    <p style="color: #888888; font-size: 12px; margin: 0;">
                      Ce message a ete envoye depuis le site web ACE STUDIO
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.projectType || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: RECIPIENT_EMAIL,
      replyTo: body.email,
      subject: `[ACE STUDIO] Nouveau message de ${body.name}`,
      html: createEmailHTML(body),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
