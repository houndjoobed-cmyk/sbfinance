import React from 'react';
import { Section } from '@/components/layout/section';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import { TypingAnimation } from '@/components/ui/typing-animation';

interface NewsPreviewProps {
  news: Array<{
    id: string;
    titre: string;
    slug: string;
    extrait: string;
    categorie: string;
    createdAt: Date;
    image: string | null;
  }>;
}

export function NewsPreview({ news }: NewsPreviewProps) {

  return (
    <Section variant="muted">
      <div className="relative flex flex-col md:flex-row justify-between items-end mb-16 mt-10 reveal-up">
        {/* Background Large Text */}
        <div 
          className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none -z-10 select-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="animate-marquee">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-[100px] md:text-[160px] lg:text-[220px] font-black text-slate-200/40 dark:text-slate-800/10 uppercase tracking-tighter whitespace-nowrap leading-none pr-16 md:pr-32">
                Actualités
              </span>
            ))}
          </div>
        </div>
        
        <div className="max-w-2xl relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-dark mb-4">
            <TypingAnimation text="Actualités Récentes" typeSpeed={50} />
          </h2>
          <p className="text-on-surface-variant text-sm tracking-[0.2em] uppercase font-semibold">
            Restez informés de nos nouveautés
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
            <div className="h-48 bg-surface-container relative overflow-hidden" style={item.image ? { backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
              {!item.image && <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>}
              <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold uppercase tracking-wider py-1 px-3">
                {item.categorie}
              </div>
            </div>
            
            <CardHeader className="pt-6 pb-2">
              <div className="flex items-center text-on-surface-variant text-sm mb-3">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(item.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
              </div>
              <CardTitle className="text-xl text-primary-dark group-hover:text-primary transition-colors">
                {item.titre}
              </CardTitle>
            </CardHeader>
            <CardContent className="grow flex flex-col justify-between">
              <p className="text-on-surface-variant line-clamp-3 mb-4">
                {item.extrait}
              </p>
            </CardContent>
            <CardFooter>
              <Link 
                href={`/actualites/${item.slug}`}
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
