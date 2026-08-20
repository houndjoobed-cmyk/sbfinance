import React from 'react';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { MapPin, Map, Navigation } from 'lucide-react';
import Link from 'next/link';
import { TypingAnimation } from '@/components/ui/typing-animation';

export function NetworkPreview() {
  const agences = [
    "Arconville (Siège)",
    "Zogbo",
    "Tankpè",
    "Togba",
    "Division Crédit aux Fonctionnaires"
  ];

  return (
    <Section variant="light" className="relative overflow-hidden">
      {/* Decorative map background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-primary-dark) 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }}></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-6 reveal-left relative pt-8">
          {/* Background Large Text */}
          <div
            className="absolute top-0 left-0 w-full pointer-events-none -z-10 select-none overflow-hidden"
            aria-hidden="true"
          >
            <div className="animate-marquee">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="text-[90px] md:text-[140px] font-black text-slate-200/40 dark:text-slate-800/10 uppercase tracking-tighter whitespace-nowrap leading-none pr-16 md:pr-32">
                  Réseau
                </span>
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-white text-primary text-sm font-bold tracking-wide uppercase shadow-sm">
              <MapPin className="h-4 w-4" />
              Notre Réseau
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-primary-dark mb-4">
              <TypingAnimation text="Toujours plus proche" typeSpeed={50} />
            </h2>

            <p className="text-on-surface-variant text-sm tracking-[0.2em] uppercase font-semibold">
              Au plus près de vos activités
            </p>
          </div>

          <div className="bg-white shadow-sm p-6 border border-outline-variant/50">
            <h3 className="font-bold text-primary-dark mb-4 flex items-center">
              <Map className="h-5 w-5 mr-2 text-accent" />
              Nos agences
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {agences.map((agence, idx) => (
                <li key={idx} className="flex items-start text-on-surface-variant text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 mr-2 shrink-0"></span>
                  {agence}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button asChild variant="primary">
              <Link href="/reseau" className="flex items-center">
                <Navigation className="mr-2 h-4 w-4" />
                Trouver une agence
              </Link>
            </Button>
          </div>
        </div>

        {/* Placeholder map illustration */}
        <div className="relative h-100 bg-white shadow-xl overflow-hidden reveal-right border border-outline-variant p-2">
          <div className="w-full h-full bg-surface-muted flex flex-col items-center justify-center border border-dashed border-outline/30 relative">
            {/* Mock map elements */}
            <div className="absolute top-1/4 left-1/3">
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-accent/20 animate-ping"></span>
                <MapPin className="h-8 w-8 text-accent relative z-10 drop-shadow-md" />
                <span className="absolute -bottom-6 font-bold text-xs bg-white px-2 py-1 rounded shadow-sm whitespace-nowrap text-primary-dark">Arconville</span>
              </div>
            </div>

            <div className="absolute top-1/2 left-2/3">
              <div className="relative flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary relative z-10 drop-shadow-md" />
                <span className="absolute -bottom-6 font-medium text-xs bg-white px-2 py-1 rounded shadow-sm whitespace-nowrap">Tankpè</span>
              </div>
            </div>

            <div className="absolute bottom-1/3 left-1/4">
              <div className="relative flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary relative z-10 drop-shadow-md" />
                <span className="absolute -bottom-6 font-medium text-xs bg-white px-2 py-1 rounded shadow-sm whitespace-nowrap">Zogbo</span>
              </div>
            </div>

            <div className="text-center mt-auto mb-8 relative z-10 bg-white/80 px-4 py-2 backdrop-blur-sm">
              <p className="text-sm font-medium text-on-surface">Carte interactive Leaflet complète sur la page Réseau</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
