import React from 'react';
import { Section } from '@/components/layout/section';
import { ArrowRight, Wallet, Landmark, Handshake, Lightbulb, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { TypingAnimation } from '@/components/ui/typing-animation';

export function ProductsServices({ content }: { content?: any }) {
  const defaultItems = [
    {
      title: "Crédit",
      description: "Solutions de financement pour vos besoins de roulement, de consommation ou d'investissement.",
      icon: "Wallet",
      image: "/images/products/credit-v2.jpg",
      link: "/produits/credit"
    },
    {
      title: "Épargne",
      description: "Sécurisez votre avenir avec nos produits d'épargne: Houenoussou, Allodo, Ahossou, Zédaga et Kondokpo.",
      icon: "Landmark",
      image: "/images/products/epargne-v2.jpg",
      link: "/produits/epargne"
    },
    {
      title: "Appui",
      description: "Un soutien sur-mesure pour développer vos activités et pérenniser votre croissance.",
      image: "/images/products/appui.png",
      link: "/produits/appui"
    },
    {
      title: "Conseil",
      description: "Expertise et accompagnement stratégique pour la gestion de votre entreprise.",
      image: "/images/products/conseil.jpeg",
      link: "/produits/conseil"
    },
    {
      title: "Formation",
      description: "Renforcez vos compétences avec nos programmes d'éducation financière et entrepreneuriale.",
      image: "/images/products/formation.jpeg",
      link: "/produits/formation"
    },
    {
      title: "Autres offres",
      description: "Découvrez nos offres personnalisées pour répondre à vos besoins spécifiques.",
      image: "/images/products/autre.jpeg",
      link: "/produits"
    }
  ];

  const items = (content?.items && content.items.length > 0) ? content.items : defaultItems;



  const defaultImgs = [
    "/images/products/credit-v2.jpg",
    "/images/products/epargne-v2.jpg",
    "/images/products/appui.png",
    "/images/products/conseil.jpeg",
    "/images/products/formation.jpeg"
  ];

  return (
    <Section variant="light" className="bg-surface-white relative z-20 py-16">
      <div className="relative text-center max-w-5xl mx-auto mb-16 reveal-up">
        {/* Background Large Text */}
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none -z-10 select-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="animate-marquee">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-[100px] md:text-[160px] lg:text-[220px] font-black text-slate-200/50 dark:text-slate-800/20 uppercase tracking-tighter whitespace-nowrap leading-none pr-16 md:pr-32">
                {content?.backgroundText || 'PRODUITS'}
              </span>
            ))}
          </div>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-primary-dark mb-4 relative z-10">
          <TypingAnimation text={content?.title || "Nos offres & Promotions"} typeSpeed={50} />
        </h2>
        <p className="text-on-surface-variant text-sm tracking-[0.2em] uppercase font-semibold relative z-10">
          {content?.subtitle || "Ce que nous offrons"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item: any, index: number) => {
          const cardImage = item.image || defaultImgs[index % defaultImgs.length];

          return (
            <div
              key={index}
              className="bg-white border border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden rounded-none relative h-full"
            >
              {/* Lien qui couvre toute la carte */}
              <Link href={item.link || "/produits"} className="absolute inset-0 z-10" aria-hidden="true"></Link>

              {/* Image de couverture */}
              <div className="relative aspect-square overflow-hidden bg-slate-100 shrink-0">
                <Image
                  src={cardImage}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
              </div>

              {/* Contenu textuel */}
              <div className="p-6 flex flex-col grow">
                <h3 className="text-xl font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <div 
                  className="text-slate-600 text-sm leading-relaxed mb-6 grow prose prose-sm prose-p:my-0 prose-headings:my-0 max-w-none line-clamp-4 overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: item.description || '' }}
                />
                <Link
                  href={item.link || "/produits"}
                  className="inline-flex items-center text-primary font-semibold hover:text-accent transition-colors mt-auto group/link relative z-20"
                >
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
