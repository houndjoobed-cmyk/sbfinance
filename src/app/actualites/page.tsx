import React from 'react';
import type { Metadata } from 'next';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { Section } from '@/components/layout/section';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import prisma from "@/lib/prisma";
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: "Actualités",
  description: "Suivez les dernières nouvelles, événements et conseils financiers de Salem Braha Finance.",
};

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  let parametres = null;
  try {
    parametres = await prisma.parametresSite.findUnique({ where: { id: 1 } });
  } catch (error) {
    console.error("Database fetch error:", error);
  }

  const actualites = await prisma.actualite.findMany({
    where: { estPublie: true },
    orderBy: { createdAt: 'desc' }
  });

  const bgUrl = parametres?.banniereAPropos || '/images/banniere.png';

  // Get unique categories for filter
  const categories = ["Tous", ...Array.from(new Set(actualites.map(a => a.categorie)))];

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Actualités - Salem Braha Finance",
        "url": "https://sbfinance.bj/actualites",
        "description": "Suivez les dernières nouvelles, événements et conseils financiers de Salem Braha Finance."
      }} />
      <Section variant="primary" className="py-24 md:py-32 lg:py-40 relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" style={{ backgroundImage: `url('${bgUrl}')` }}></div>
        <div className="absolute inset-0 bg-primary-dark/70 z-0"></div>
        <div className="text-center max-w-3xl mx-auto relative z-10 reveal-up">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            <TypingAnimation text="Actualités" typeSpeed={50} />
          </h1>
          <p className="text-xl text-white drop-shadow-md font-medium">
            Restez informés des dernières nouveautés, événements et opportunités chez Salem Braha Finance.
          </p>
        </div>
      </Section>

      <Section variant="default">
        {/* Categories filter - visual only for now */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 reveal-up">
          {categories.map((cat, idx) => (
            <button 
              key={idx}
              className={`px-4 py-2 rounded-none text-sm font-medium transition-colors ${idx === 0 ? 'bg-primary text-white' : 'bg-surface-muted text-on-surface-variant hover:bg-surface-container'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {actualites.length > 0 ? (
            actualites.map((item, index) => (
              <Card key={item.id} className={`flex flex-col h-full rounded-none reveal-up delay-${(index % 3 + 1) * 100} group border-outline-variant/50 hover:shadow-lg transition-all`}>
                <div 
                  className="h-48 bg-surface-container relative overflow-hidden rounded-none"
                  style={item.image ? { backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                >
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-none shadow-md">
                    {item.categorie}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col grow">
                  <CardHeader className="p-0 pb-2">
                    <div className="flex items-center text-on-surface-variant text-sm mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(item.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
                    <CardTitle className="text-xl text-primary-dark group-hover:text-primary transition-colors">
                      {item.titre}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 py-2 grow">
                    <p className="text-on-surface-variant line-clamp-3">
                      {item.extrait}
                    </p>
                  </CardContent>
                  <CardFooter className="p-0 pt-4 mt-auto">
                    <Link 
                      href={(item as any).lienExterne ? (item as any).lienExterne : `/actualites/${item.slug}`}
                      target={(item as any).lienExterne ? "_blank" : undefined}
                      rel={(item as any).lienExterne ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center text-accent font-medium hover:text-accent-hover transition-colors"
                    >
                      Lire la suite
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </CardFooter>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              Aucune actualité n'est disponible pour le moment.
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex justify-center reveal-up">
          <nav className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-none border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-muted disabled:opacity-50" disabled>
              &laquo;
            </button>
            <button className="w-10 h-10 rounded-none bg-primary text-white flex items-center justify-center font-medium">
              1
            </button>
            <button className="w-10 h-10 rounded-none border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-muted">
              2
            </button>
            <button className="w-10 h-10 rounded-none border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-muted">
              &raquo;
            </button>
          </nav>
        </div>
      </Section>
    </>
  );
}
