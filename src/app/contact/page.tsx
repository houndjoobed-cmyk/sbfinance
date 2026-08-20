import React from 'react';
import type { Metadata } from 'next';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { Section } from '@/components/layout/section';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import prisma from "@/lib/prisma";
import { ContactForm } from '@/components/contact/contact-form';

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez Salem Braha Finance pour toute question sur nos offres de crédit ou d'épargne. Trouvez notre siège à Arconville.",
};

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  let parametres = {
    telephonePrincipal: "+229 01 21 38 05 87",
    emailPrincipal: "contact@sbfinance.bj",
    adresseSiege: "ZOGBO Carré 553 Lot 1907 M 072, Arconville / Abomey-Calavi, Bénin",
  };
  let agencies: any[] = [];

  try {
    const fetchedParametres = await prisma.parametresSite.findFirst() as any;
    if (fetchedParametres) {
      parametres = fetchedParametres;
    }

    agencies = await prisma.agence.findMany({
      select: {
        id: true,
        nom: true,
      },
      orderBy: {
        nom: 'asc'
      }
    });
  } catch (error) {
    console.error("Database fetch error:", error);
  }

  return (
    <>
      <Section variant="primary" className="pt-40 pb-16 md:pt-50 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-dark/80 z-0"></div>
        <div className="absolute inset-0 bg-[url('/images/hero/hero-agency.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay z-0"></div>
        <div className="text-center max-w-3xl mx-auto relative z-10 reveal-up">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6"><TypingAnimation text="Contactez-nous" typeSpeed={50} /></h1>
          <p className="text-xl text-primary-light">
            Une question ? Un projet ? Notre équipe est à votre écoute pour vous accompagner.
          </p>
        </div>
      </Section>

      <Section variant="default">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8 reveal-left">
            <div>
              <h2 className="text-3xl font-bold text-primary-dark mb-6"><TypingAnimation text="Nos Coordonnées" typeSpeed={50} /></h2>
              <p className="text-on-surface-variant mb-8">
                N'hésitez pas à nous contacter directement ou à venir nous rencontrer dans l'une de nos agences.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="border-0 shadow-sm bg-surface-muted">
                <CardContent className="p-6 flex items-start">
                  <MapPin className="h-6 w-6 text-accent mr-4 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-primary-dark text-lg mb-1">Siège social</h3>
                    <p className="text-on-surface-variant whitespace-pre-line">{parametres.adresseSiege}</p>
                    <p className="text-on-surface-variant mt-2 text-sm">BP 317</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-surface-muted">
                <CardContent className="p-6 flex items-start">
                  <Phone className="h-6 w-6 text-accent mr-4 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-primary-dark text-lg mb-1">Téléphone</h3>
                    <p className="text-on-surface-variant">{parametres.telephonePrincipal}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-surface-muted">
                <CardContent className="p-6 flex items-start">
                  <Mail className="h-6 w-6 text-accent mr-4 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-primary-dark text-lg mb-1">Email</h3>
                    <a href={`mailto:${parametres.emailPrincipal || 'contact@sbfinance.bj'}`} className="text-primary hover:underline">
                      {parametres.emailPrincipal || 'contact@sbfinance.bj'}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="reveal-right">
            <Card className="shadow-lg border-outline-variant/50">
              <CardContent className="p-8">
                <ContactForm agencies={agencies} />
              </CardContent>
            </Card>
          </div>

        </div>
      </Section>
    </>
  );
}
