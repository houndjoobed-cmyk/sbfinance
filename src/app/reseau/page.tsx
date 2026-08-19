import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/section';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { MapWrapper } from '@/components/network/map-wrapper';

export const metadata: Metadata = {
  title: "Notre réseau d'agences",
  description: "Trouvez l'agence Salem Braha Finance la plus proche de chez vous au Bénin. Consultez nos horaires et coordonnées.",
};

export default function NetworkPage() {
  const agencies = [
    {
      id: 1,
      name: "Arconville (Siège)",
      address: "ZOGBO Carré 553 Lot 1907 M 072, Arconville / Abomey-Calavi",
      phone: "+229 01 21 38 05 87",
      whatsapp: "+229 01 28 30 59 76",
      hours: "Lun-Ven: 08:00 - 17:00 | Sam: 09:00 - 13:00"
    },
    {
      id: 2,
      name: "Agence de Zogbo",
      address: "Zogbo central",
      phone: "+229 01 61 09 20 32",
      whatsapp: "+229 01 28 30 59 76",
      hours: "Lun-Ven: 08:00 - 17:00 | Sam: 09:00 - 13:00"
    },
    {
      id: 3,
      name: "Agence de Tankpè",
      address: "Carrefour Tankpè, Abomey-Calavi",
      phone: "+229 01 28 30 59 76",
      whatsapp: "+229 01 28 30 59 76",
      hours: "Lun-Ven: 08:00 - 17:00 | Sam: Fermé"
    },
    {
      id: 4,
      name: "Agence de Togba",
      address: "Togba Centre",
      phone: "+229 01 21 38 05 87",
      whatsapp: "+229 01 28 30 59 76",
      hours: "Lun-Ven: 08:00 - 17:00 | Sam: 09:00 - 13:00"
    },
    {
      id: 5,
      name: "Division Crédit aux Fonctionnaires",
      address: "Cotonou Centre",
      phone: "+229 01 61 09 20 32",
      whatsapp: "+229 01 28 30 59 76",
      hours: "Lun-Ven: 08:00 - 17:00 | Sam: Fermé"
    }
  ];

  return (
    <>
      <Section variant="primary" className="pt-[160px] pb-16 md:pt-[200px] md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-dark/80 z-0"></div>
        <div className="absolute inset-0 bg-[url('/images/hero/hero-community.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay z-0"></div>
        <div className="text-center max-w-3xl mx-auto relative z-10 reveal-up">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Notre Réseau</h1>
          <p className="text-xl text-primary-light">
            Une présence stratégique pour vous offrir un service de proximité et une assistance rapide.
          </p>
        </div>
      </Section>

      <Section variant="default">
        <div className="mb-12 text-center max-w-2xl mx-auto reveal-up">
          <h2 className="text-3xl font-bold text-primary-dark mb-4">5 Points de Service</h2>
          <p className="text-on-surface-variant">
            Explorez notre carte interactive pour localiser l'agence la plus proche de votre activité.
          </p>
        </div>

        {/* Interactive Map */}
        <div className="mb-16 reveal-up delay-100">
          <div className="h-[500px] w-full">
            <MapWrapper />
          </div>
        </div>

        {/* Agencies List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {agencies.map((agency, index) => (
            <Card key={agency.id} className={`shadow-md hover:shadow-lg transition-shadow border-outline-variant/30 reveal-up delay-${(index % 3 + 1) * 100}`}>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-primary-dark mb-4 flex items-center">
                  <MapPin className="h-5 w-5 text-accent mr-2" />
                  {agency.name}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <p className="text-sm text-on-surface-variant flex items-start">
                    <span className="font-medium min-w-[80px]">Adresse:</span> 
                    {agency.address}
                  </p>
                  <p className="text-sm text-on-surface-variant flex items-start">
                    <span className="font-medium min-w-[80px]">Tél:</span> 
                    {agency.phone}
                  </p>
                  <p className="text-sm text-on-surface-variant flex items-start">
                    <Clock className="h-4 w-4 mr-2 text-on-surface-variant/70 mt-0.5" />
                    {agency.hours}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <a href={`tel:${agency.phone.replace(/\s+/g, '')}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Appeler
                    </a>
                  </Button>
                  <Button asChild variant="primary" size="sm" className="flex-1">
                    <a href={`https://wa.me/${agency.whatsapp.replace(/\+/g, '').replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer">
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
