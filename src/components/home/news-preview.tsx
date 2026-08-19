import React from 'react';
import { Section } from '@/components/layout/section';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';

export function NewsPreview() {
  // Placeholder data - this will eventually be fetched from Supabase
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
    }
  ];

  return (
    <Section variant="muted">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 reveal-up">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">Actualités Récentes</h2>
          <p className="text-on-surface-variant text-lg">
            Restez informés des dernières nouveautés de Salem Braha Finance et de nos actions sur le terrain.
          </p>
        </div>
        <Button asChild variant="outline" className="mt-6 md:mt-0 hidden sm:flex">
          <Link href="/actualites">Toutes les actualités</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item, index) => (
          <Card key={item.id} className={`flex flex-col h-full reveal-up delay-${(index + 1) * 100} group`}>
            {/* Image Placeholder */}
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
              <Link 
                href={`/actualites/${item.id}`}
                className="inline-flex items-center text-accent font-medium hover:text-accent-hover transition-colors"
              >
                Lire la suite
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 text-center sm:hidden">
        <Button asChild variant="outline" className="w-full">
          <Link href="/actualites">Toutes les actualités</Link>
        </Button>
      </div>
    </Section>
  );
}
