import React from 'react';
import type { Metadata } from 'next';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { Section } from '@/components/layout/section';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { MapWrapper } from '@/components/network/map-wrapper';
import prisma from "@/lib/prisma";
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: "Notre réseau d'agences",
  description: "Trouvez l'agence Salem Braha Finance la plus proche de chez vous au Bénin. Consultez nos horaires et coordonnées.",
};

export const dynamic = 'force-dynamic';

export default async function NetworkPage() {
  let dbAgencies: any[] = [];
  let parametres = {
    telephonePrincipal: "+229 01 21 38 05 87"
  };

  try {
    dbAgencies = await prisma.agence.findMany({
      orderBy: { nom: 'asc' }
    });

    const fetchedParametres = await prisma.parametresSite.findFirst();
    if (fetchedParametres) {
      parametres = fetchedParametres as any;
    }
  } catch (error) {
    console.error("Database fetch error:", error);
  }

  const defaultAgencies = [
    {
      id: "1",
      name: "Arconville (Siège)",
      address: "ZOGBO Carré 553 Lot 1907 M 072, Arconville / Abomey-Calavi",
      phone: "+229 01 21 38 05 87",
      whatsapp: "+229 01 28 30 59 76",
      hours: "Lun-Ven: 08:00 - 17:00 | Sam: 09:00 - 13:00",
      position: [6.435, 2.348] as [number, number]
    },
    {
      id: "2",
      name: "Agence de Zogbo",
      address: "Zogbo central",
      phone: "+229 01 61 09 20 32",
      whatsapp: "+229 01 28 30 59 76",
      hours: "Lun-Ven: 08:00 - 17:00 | Sam: 09:00 - 13:00",
      position: [6.386, 2.383] as [number, number]
    }
  ];

  let agencies = defaultAgencies;

  if (dbAgencies.length > 0) {
    agencies = dbAgencies.map((a: any) => {
      let position: [number, number] = [6.42, 2.36]; // default Cotonou center
      if (a.coordonneesGps) {
        const parts = a.coordonneesGps.split(',');
        if (parts.length === 2) {
          position = [parseFloat(parts[0]), parseFloat(parts[1])];
        }
      }

      let phones: string[] = [];
      try {
        phones = (a.telephones as unknown as string[]) || [];
      } catch (e) {
        console.error("Error parsing phones", e);
      }

      const mainPhone = phones.length > 0 ? phones[0] : parametres.telephonePrincipal;
      const whatsapp = phones.length > 1 ? phones[1] : parametres.telephonePrincipal;

      return {
        id: a.id,
        name: a.nom,
        address: a.adresse,
        phone: mainPhone,
        whatsapp: whatsapp,
        hours: a.horaires,
        position: position
      };
    });
  }

  // Ensure sieges are displayed first
  agencies.sort((a, b) => {
    if (a.name.toLowerCase().includes('siège') && !b.name.toLowerCase().includes('siège')) return -1;
    if (!a.name.toLowerCase().includes('siège') && b.name.toLowerCase().includes('siège')) return 1;
    return 0;
  });

  const bgUrl = (parametres as any)?.banniereAPropos || '/images/banniere.png';

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FinancialService",
        "name": "Réseau d'Agences Salem Braha Finance",
        "url": "https://sbfinance.bj/reseau",
        "description": "Trouvez l'agence Salem Braha Finance la plus proche de chez vous au Bénin.",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "BJ"
        }
      }} />
      <Section variant="primary" className="py-24 md:py-32 lg:py-40 relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" style={{ backgroundImage: `url('${bgUrl}')` }}></div>
        <div className="absolute inset-0 bg-primary-dark/70 z-0"></div>
        <div className="text-center max-w-3xl mx-auto relative z-10 reveal-up">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            <TypingAnimation text="Notre Réseau" typeSpeed={50} />
          </h1>
          <p className="text-xl text-white drop-shadow-md font-medium">
            Trouvez l'agence Salem Braha Finance la plus proche de chez vous.
          </p>
        </div>
      </Section>

      <Section variant="default">
        <div className="mb-12 text-center max-w-2xl mx-auto reveal-up">
          <h2 className="text-3xl font-bold text-primary-dark mb-4"><TypingAnimation text={`${agencies.length} Points de Service`} typeSpeed={50} /></h2>
          <p className="text-on-surface-variant">
            Explorez notre carte interactive pour localiser l'agence la plus proche de votre activité.
          </p>
        </div>

        {/* Interactive Map */}
        <div className="mb-16 reveal-up delay-100">
          <div className="lg:col-span-8 bg-surface-muted overflow-hidden shadow-sm h-125 relative reveal-left">
            <MapWrapper agencies={agencies} />
          </div>
        </div>

        {/* Agencies List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {agencies.map((agency, index) => (
            <Card key={agency.id} className={`shadow-md hover:shadow-lg transition-shadow border-outline-variant/30 reveal-up delay-${(index % 3 + 1) * 100} h-full flex flex-col`}>
              <CardContent className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-bold text-primary-dark mb-4 flex items-center">
                  <MapPin className="h-5 w-5 text-accent mr-2 shrink-0" />
                  {agency.name}
                </h3>

                <div className="space-y-3 mb-6">
                  <p className="text-sm text-on-surface-variant flex items-start">
                    <span className="font-medium min-w-[80px]">Adresse:</span>
                    <span>{agency.address}</span>
                  </p>
                  <p className="text-sm text-on-surface-variant flex items-start">
                    <span className="font-medium min-w-[80px]">Tél:</span>
                    {agency.phone}
                  </p>
                  <p className="text-sm text-on-surface-variant flex items-start">
                    <Clock className="h-4 w-4 mr-2 text-on-surface-variant/70 mt-0.5 shrink-0" />
                    {agency.hours}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-auto pt-2">
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <a href={`tel:${agency.phone.replace(/\s+/g, '')}`} className="w-full h-full flex items-center justify-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Appeler
                    </a>
                  </Button>
                  <Button asChild variant="primary" size="sm" className="flex-1">
                    <a href={`https://wa.me/${agency.whatsapp.replace(/\+/g, '').replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
