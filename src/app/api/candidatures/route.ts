import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { offreId, offreTitre, nom, prenom, telephone, email, cvUrl, lettreUrl, message } = body;

    if (!offreId || !nom || !prenom || !telephone || !email || !cvUrl || !lettreUrl) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 });
    }

    // 1. Save in database
    const candidature = await prisma.candidature.create({
      data: {
        offreId,
        nom,
        prenom,
        telephone,
        email,
        cvUrl,
        lettreUrl,
        message,
      },
    });

    // 2. Send email notification via Resend HTTP API (if configured)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'SBF Recrutement <onboarding@resend.dev>', // Should be a verified domain in prod
            to: ['recrutement20255@yahoo.com'],
            subject: `Nouvelle candidature : ${offreTitre} - ${prenom} ${nom}`,
            html: `
              <h2>Nouvelle candidature reçue</h2>
              <p><strong>Poste :</strong> ${offreTitre}</p>
              <p><strong>Candidat :</strong> ${prenom} ${nom}</p>
              <p><strong>Email :</strong> ${email}</p>
              <p><strong>Téléphone :</strong> ${telephone}</p>
              ${message ? `<p><strong>Message :</strong><br/>${message.replace(/\n/g, '<br/>')}</p>` : ''}
              
              <h3>Documents joints :</h3>
              <ul>
                <li><a href="${cvUrl}">Télécharger le CV</a></li>
                <li><a href="${lettreUrl}">Télécharger la Lettre de motivation</a></li>
              </ul>
            `,
          }),
        });
      } catch (emailError) {
        console.error('Erreur lors de l\'envoi de l\'email:', emailError);
        // We don't fail the request if email fails
      }
    } else {
      console.warn('RESEND_API_KEY non configurée. Email non envoyé.');
    }

    return NextResponse.json({ success: true, candidature });
  } catch (error) {
    console.error('Erreur API candidature:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
