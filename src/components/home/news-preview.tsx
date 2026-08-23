import React from 'react';
import { Section } from '@/components/layout/section';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import { TypingAnimation } from '@/components/ui/typing-animation';

interface NewsPreviewProps {
  news: any[];
  content?: any;
}

export function NewsPreview({ news, content }: NewsPreviewProps) {
  return (
    <Section variant="light" className="relative bg-surface-muted py-24">
      {/* Background Large Text */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none z-0 select-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="animate-marquee">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-[120px] md:text-[180px] font-black text-slate-200/50 dark:text-slate-800/20 uppercase tracking-tighter whitespace-nowrap leading-none pr-16 md:pr-32">
              {content?.backgroundText || 'ACTUALITÉS'}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto mb-16 reveal-up">
        <h2 className="text-3xl md:text-5xl font-bold text-primary-dark mb-4">
          <TypingAnimation text={content?.title || "Restez informés"} typeSpeed={50} />
        </h2>
        <p className="text-on-surface-variant text-sm tracking-[0.2em] uppercase font-semibold mb-6">
          {content?.subtitle || "Les dernières nouveautés SBF"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
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
                href={item.lienExterne ? item.lienExterne : `/actualites/${item.slug}`}
                target={item.lienExterne ? "_blank" : undefined}
                rel={item.lienExterne ? "noopener noreferrer" : undefined}
                className="inline-flex items-center text-accent font-medium hover:text-accent-hover transition-colors"
              >
                Lire la suite
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 text-center sm:hidden relative z-10">
        <Button asChild variant="outline" className="w-full">
          <Link href="/actualites">Toutes les actualités</Link>
        </Button>
      </div>
    </Section>
  );
}
