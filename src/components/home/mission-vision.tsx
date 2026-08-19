import React from 'react';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { Target, Eye } from 'lucide-react';
import Link from 'next/link';

export function MissionVision() {
  return (
    <Section variant="light" className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 reveal-left">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark">Notre Engagement</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <Target className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-dark mb-2">Notre Mission</h3>
                <p className="text-on-surface-variant">
                  Contribuer à l'amélioration des conditions de vie des personnes à faible revenu, notamment les femmes des zones urbaines et rurales, via des services financiers et non financiers adaptés et durables.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <Eye className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-dark mb-2">Notre Vision</h3>
                <p className="text-on-surface-variant">
                  Être une institution de microfinance leader dans la finance inclusive, responsable et environnementale au Bénin à l'horizon 2035.
                </p>
              </div>
            </div>
          </div>

          <Button asChild variant="primary" size="lg">
            <Link href="/a-propos">En savoir plus sur nous</Link>
          </Button>
        </div>

        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl reveal-right">
          {/* Using a placeholder div instead of Image to avoid missing assets during build */}
          <div className="absolute inset-0 bg-primary-dark opacity-10"></div>
          <div className="absolute inset-0 flex items-center justify-center text-primary/30 p-8 text-center">
            [Image: Photo des membres / locaux de Salem Braha Finance]
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent rounded-full opacity-20"></div>
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary rounded-full opacity-10"></div>
        </div>
      </div>
    </Section>
  );
}
