import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components/layout/section';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Actualités",
  description: "Suivez les dernières nouvelles, événements et conseils financiers de Salem Braha Finance.",
};

export default function NewsPage() {
  const news = [
    {
      id: 1,
      title: "Nouvelle agence à Tankpè pour mieux vous servir",
      date: "15 Août 2026",
      excerpt: "SBF continue son expansion avec l'ouverture d'une nouvelle agence à Tankpè, rapprochant nos services des populations.",
      category: "Événement"
    },
    {
      id: 2,
      title: "Lancement du produit d'épargne 'Allodo'",
      date: "02 Août 2026",
      excerpt: "Découvrez 'Allodo', notre nouvelle solution d'épargne conçue spécifiquement pour sécuriser les revenus des commerçants.",
      category: "Produit"
    },
    {
      id: 3,
      title: "Campagne d'éducation financière dans la zone rurale",
      date: "20 Juillet 2026",
      excerpt: "Nos équipes ont animé une série de formations sur la gestion budgétaire auprès de plus de 500 femmes entrepreneurs.",
      category: "Social"
    },
    {
      id: 4,
      title: "SBF célèbre ses 15 ans d'existence",
      date: "05 Juin 2026",
      excerpt: "Un parcours riche en accompagnements et en réussites partagées avec nos clients. Retour sur notre évolution.",
      category: "Événement"
    },
    {
      id: 5,
      title: "5 conseils pour bien gérer son fonds de roulement",
      date: "12 Mai 2026",
      excerpt: "La séparation des caisses est essentielle pour la survie d'une micro-entreprise. Voici comment faire.",
      category: "Conseil"
    },
    {
      id: 6,
      title: "Remise d'équipements aux groupements de femmes",
      date: "28 Mars 2026",
      excerpt: "Dans le cadre de notre produit CAF, plusieurs coopératives agricoles ont reçu de nouveaux équipements.",
      category: "Social"
    }
  ];

  return (
    <>
      <Section variant="primary" className="pt-[160px] pb-16 md:pt-[200px] md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-dark/80 z-0"></div>
        <div className="absolute inset-0 bg-[url('/images/hero/hero-women.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay z-0"></div>
        <div className="text-center max-w-3xl mx-auto relative z-10 reveal-up">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Actualités</h1>
          <p className="text-xl text-primary-light">
            Découvrez la vie de notre institution, nos nouveautés et nos conseils.
          </p>
        </div>
      </Section>

      <Section variant="default">
        {/* Categories filter - visual only for now */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 reveal-up">
          {["Tous", "Événement", "Produit", "Conseil", "Social"].map((cat, idx) => (
            <button 
              key={idx}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${idx === 0 ? 'bg-primary text-white' : 'bg-surface-muted text-on-surface-variant hover:bg-surface-container'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <Card key={item.id} className={`flex flex-col h-full reveal-up delay-${(index % 3 + 1) * 100} group border-outline-variant/50 hover:shadow-lg transition-all`}>
              <div className="h-48 bg-surface-container relative overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                  {item.category}
                </div>
              </div>
              
              <CardHeader className="pt-6 pb-2">
                <div className="flex items-center text-on-surface-variant text-sm mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  {item.date}
                </div>
                <CardTitle className="text-xl text-primary-dark group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-on-surface-variant">
                  {item.excerpt}
                </p>
              </CardContent>
              <CardFooter>
                {/* Links to a generic post page or # for demo */}
                <Link 
                  href="#"
                  className="inline-flex items-center text-accent font-medium hover:text-accent-hover transition-colors"
                >
                  Lire la suite
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex justify-center reveal-up">
          <nav className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-md border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-muted disabled:opacity-50" disabled>
              &laquo;
            </button>
            <button className="w-10 h-10 rounded-md bg-primary text-white flex items-center justify-center font-medium">
              1
            </button>
            <button className="w-10 h-10 rounded-md border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-muted">
              2
            </button>
            <button className="w-10 h-10 rounded-md border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-muted">
              &raquo;
            </button>
          </nav>
        </div>
      </Section>
    </>
  );
}
