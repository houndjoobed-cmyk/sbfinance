import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

async function checkAuth() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        }
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const user = await checkAuth();
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const data = await request.json();

    const contact = await prisma.demandeContact.update({
      where: { id: params.id },
      data: { estTraite: data.estTraite }
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error('API Contacts PUT Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildReplyEmailHtml(params: {
  clientName: string;
  replyMessage: string;
  originalMessage: string;
  subject: string;
}) {
  const safeName = escapeHtml(params.clientName);
  const safeReply = escapeHtml(params.replyMessage).replace(/\n/g, '<br />');
  const safeOriginal = escapeHtml(params.originalMessage.split('\n\n--- [RÉPONSE ENVOYÉE')[0]).replace(/\n/g, '<br />');

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(params.subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:'Segoe UI',Arial,sans-serif;color:#1e293b;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#111e36 0%,#0991b5 100%);padding:28px 32px;text-align:left;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:0.3px;">
                Salem Braha Finance (SBF)
              </h1>
              <p style="margin:4px 0 0;color:#e0f2fe;font-size:13px;">
                Cultivons la prospérité • Service Relation Clientèle
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;font-size:15px;color:#0f172a;">
                Bonjour <strong>${safeName}</strong>,
              </p>
              <div style="font-size:15px;line-height:1.65;color:#1e293b;margin-bottom:28px;">
                ${safeReply}
              </div>

              <!-- Original message quote -->
              <div style="background-color:#f8fafc;border-left:4px solid #0991b5;padding:16px 20px;border-radius:6px;margin-top:24px;">
                <p style="margin:0 0 8px;font-size:12px;font-weight:700;text-transform:uppercase;color:#64748b;letter-spacing:0.5px;">
                  Rappel de votre message
                </p>
                <div style="font-size:13px;line-height:1.5;color:#475569;">
                  ${safeOriginal}
                </div>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 32px;font-size:12px;color:#64748b;line-height:1.6;">
              <strong style="color:#111e36;">Salem Braha Finance (SBF)</strong><br />
              Siège social : ZOGBO Carré 553 Lot 1907 M 072, Arconville / Abomey-Calavi, Bénin<br />
              Tél : +229 01 21 38 05 87 / 01 61 09 20 32 • WhatsApp : +229 01 28 30 59 76<br />
              Email : <a href="mailto:contact@sbfinance.bj" style="color:#0991b5;text-decoration:none;">contact@sbfinance.bj</a> •
              Site web : <a href="https://sbfinance.bj" style="color:#0991b5;text-decoration:none;">sbfinance.bj</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const user = await checkAuth();
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const body = await request.json();
    const toEmail = (body.email || '').trim();
    const subject = (body.subject || 'Réponse à votre message - Salem Braha Finance').trim();
    const replyMessage = (body.replyMessage || '').trim();

    if (!toEmail) {
      return NextResponse.json(
        { error: "Aucune adresse email destinataire n'est renseignée." },
        { status: 400 }
      );
    }

    if (!replyMessage) {
      return NextResponse.json(
        { error: 'Veuillez saisir un message de réponse.' },
        { status: 400 }
      );
    }

    const existingContact = await prisma.demandeContact.findUnique({
      where: { id: params.id }
    });

    if (!existingContact) {
      return NextResponse.json({ error: 'Demande introuvable.' }, { status: 404 });
    }

    const htmlContent = buildReplyEmailHtml({
      clientName: existingContact.nom,
      replyMessage,
      originalMessage: existingContact.message,
      subject,
    });

    const resendApiKey = process.env.RESEND_API_KEY;
    const brevoApiKey = process.env.BREVO_API_KEY;
    const fromEmail = process.env.EMAIL_FROM || 'Salem Braha Finance <contact@sbfinance.bj>';
    const replyToEmail = process.env.EMAIL_REPLY_TO || 'contact@sbfinance.bj';

    if (resendApiKey) {
      const sendViaResend = (sender: string) =>
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: sender,
            to: [toEmail],
            reply_to: replyToEmail,
            subject,
            html: htmlContent,
            text: `Bonjour ${existingContact.nom},\n\n${replyMessage}\n\n---\nSalem Braha Finance (SBF)\nTél : +229 01 21 38 05 87\nhttps://sbfinance.bj`,
          }),
        });

      let resendRes = await sendViaResend(fromEmail);

      if (!resendRes.ok) {
        const errData = await resendRes.json().catch(() => ({}));
        // Si le domaine sbfinance.bj est encore en cours de propagation DNS, basculer automatiquement sur onboarding@resend.dev
        if (
          fromEmail !== 'Salem Braha Finance <onboarding@resend.dev>' &&
          typeof errData?.message === 'string' &&
          errData.message.toLowerCase().includes('not verified')
        ) {
          resendRes = await sendViaResend('Salem Braha Finance <onboarding@resend.dev>');
          if (!resendRes.ok) {
            const fallbackErr = await resendRes.json().catch(() => ({}));
            return NextResponse.json(
              {
                error:
                  fallbackErr?.message ||
                  "Le domaine sbfinance.bj est encore en cours de vérification DNS dans Resend.",
              },
              { status: 502 }
            );
          }
        } else {
          console.error('Erreur Resend:', errData);
          return NextResponse.json(
            {
              error:
                errData?.message ||
                "Échec de l'envoi de l'email via Resend. Vérifiez votre clé RESEND_API_KEY et le domaine expéditeur.",
            },
            { status: 502 }
          );
        }
      }
    } else if (brevoApiKey) {
      const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': brevoApiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'Salem Braha Finance', email: replyToEmail },
          to: [{ email: toEmail, name: existingContact.nom }],
          replyTo: { email: replyToEmail, name: 'Salem Braha Finance' },
          subject,
          htmlContent,
        }),
      });

      if (!brevoRes.ok) {
        const errData = await brevoRes.json().catch(() => ({}));
        console.error('Erreur Brevo:', errData);
        return NextResponse.json(
          {
            error:
              errData?.message ||
              "Échec de l'envoi de l'email via Brevo. Vérifiez votre clé BREVO_API_KEY.",
          },
          { status: 502 }
        );
      }
    } else {
      return NextResponse.json(
        {
          error:
            "Clé d'envoi email manquante : ajoutez RESEND_API_KEY (ou BREVO_API_KEY) dans votre fichier .env pour envoyer les emails directement depuis le serveur.",
          missingConfig: true,
        },
        { status: 400 }
      );
    }

    const dateStr = new Date().toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const baseMessage = existingContact.message.split('\n\n--- [RÉPONSE ENVOYÉE')[0];
    const updatedMessage = `${baseMessage}\n\n--- [RÉPONSE ENVOYÉE LE ${dateStr} À ${toEmail}] ---\nObjet : ${subject}\n${replyMessage}`;

    const updatedContact = await prisma.demandeContact.update({
      where: { id: params.id },
      data: {
        estTraite: true,
        email: toEmail,
        message: updatedMessage,
      },
    });

    return NextResponse.json({
      success: true,
      contact: updatedContact,
    });
  } catch (error) {
    console.error('API Contacts Reply POST Error:', error);
    return NextResponse.json({ error: "Erreur serveur lors de l'envoi de la réponse." }, { status: 500 });
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const user = await checkAuth();
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    await prisma.demandeContact.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Contacts DELETE Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
