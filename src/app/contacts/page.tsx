import React from 'react';
import type { Metadata } from 'next';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { Section } from '@/components/layout/section';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, AlertCircle } from 'lucide-react';
import prisma from "@/lib/prisma";
import { ContactForm } from '@/components/contact/contact-form';
import { JsonLd } from '@/components/seo/JsonLd';
import { ReclamationModal } from '@/components/contact/ReclamationModal';

export const metadata: Metadata = {
  title: "Contacts",
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

  const bgUrl = (parametres as any)?.banniereAPropos || '/images/banniere.png';

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contactez Salem Braha Finance",
        "url": "https://sbfinance.bj/contacts",
        "description": "Contactez-nous pour toute question sur nos offres de crédit ou d'épargne.",
        "mainEntity": {
          "@type": "Organization",
          "name": "Salem Braha Finance",
          "telephone": "+229-01-21-38-05-87",
          "email": "contact@sbfinance.bj"
        }
      }} />
      <Section variant="primary" className="py-24 md:py-32 lg:py-40 relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" style={{ backgroundImage: `url('${bgUrl}')` }}></div>
        <div className="absolute inset-0 bg-primary-dark/70 z-0"></div>
        <div className="text-center max-w-3xl mx-auto relative z-10 reveal-up">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            <TypingAnimation text="Contactez-nous" typeSpeed={50} />
          </h1>
          <p className="text-xl text-white drop-shadow-md font-medium">
            Notre équipe est à votre écoute pour vous accompagner dans vos projets et répondre à toutes vos questions.
          </p>
        </div>
      </Section>

      <Section variant="default" className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12 reveal-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none bg-accent/10 text-accent font-medium text-sm mb-4">
              <Mail className="w-4 h-4" /> Joignez-nous
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary-dark mb-4">
              <TypingAnimation text="Contactez-nous" typeSpeed={50} />
            </h2>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
              Pour tous renseignements ou suggestions, veuillez nous écrire en remplissant le formulaire ci-dessous ou utiliser nos coordonnées.
            </p>
          </div>

          <div className="reveal-up delay-100 mb-16">
            <ContactForm agencies={agencies} />
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-up delay-200">
            <Card className="border-0 shadow-sm bg-white rounded-none hover:shadow-md transition-shadow">
              <CardContent className="p-8 text-center flex flex-col items-center">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-none flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-primary-dark text-lg mb-2">Siège social</h3>
                <p className="text-on-surface-variant text-sm whitespace-pre-line">{parametres.adresseSiege}</p>
                <p className="text-on-surface-variant mt-2 text-xs font-medium">BP 317</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white rounded-none hover:shadow-md transition-shadow">
              <CardContent className="p-8 text-center flex flex-col items-center">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-none flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-primary-dark text-lg mb-2">Téléphone</h3>
                <p className="text-on-surface-variant font-medium">{parametres.telephonePrincipal}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white rounded-none hover:shadow-md transition-shadow">
              <CardContent className="p-8 text-center flex flex-col items-center">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-none flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-primary-dark text-lg mb-2">Email</h3>
                <a href={`mailto:${parametres.emailPrincipal || 'contact@sbfinance.bj'}`} className="text-primary hover:underline font-medium break-all">
                  {parametres.emailPrincipal || 'contact@sbfinance.bj'}
                </a>
              </CardContent>
            </Card>
            
            <div className="md:col-span-3">
              <Card className="shadow-sm bg-red-50 border border-red-100 rounded-none overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
                    <div className="w-14 h-14 bg-red-100 text-red-600 rounded-none flex items-center justify-center shrink-0">
                      <AlertCircle className="h-8 w-8" />
                    </div>
                    <div className="grow">
                      <h3 className="font-bold text-red-700 text-xl mb-1">Service réclamation</h3>
                      <p className="text-red-600 font-semibold text-2xl mb-4">01 49 34 30 64</p>
                      <ReclamationModal />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </Section>
    </>
  );
}

