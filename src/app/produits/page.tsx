import React from 'react';
import type { Metadata } from 'next';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { Section } from '@/components/layout/section';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, TrendingUp, Handshake, Lightbulb, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Nos Produits",
  description: "Découvrez nos offres de crédit, d'épargne et d'accompagnement pour concrétiser vos projets.",
};

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  let allCredits: any[] = [];
  try {
    allCredits = await prisma.produitCredit.findMany({
      orderBy: { nom: 'asc' }
    });
  } catch (error) {
    console.error("Database fetch error:", error);
  }

  // Default hardcoded fallback in case DB is empty
  let creditCategories = [
    {
      title: "Besoin de fonds de roulement",
      products: [
        { name: "Crédit de Groupe (CG)", slug: "cg", desc: "Soutien aux activités génératrices de revenus pour les groupes solidaires." },
        { name: "Garantie de Caution Solidaire (GCS)", slug: "gcs", desc: "Financement d'opportunités avec garanties allégées par cautionnement mutuel." },
        { name: "Crédit Individuel à Caution Physique (CICP)", slug: "cicp", desc: "Pour les micro-entrepreneurs ayant une activité stable avec avaliseur." },
        { name: "Crédit Cale (CC)", slug: "cc", desc: "Solution de renflouement temporaire de caisse." },
      ]
    },
    {
      title: "Crédit à la consommation",
      products: [
        { name: "Crédit aux Fonctionnaires (CF)", slug: "cf", desc: "Découvert permanent ou prêts à moyen terme pour les agents de l'État." },
        { name: "Salarié Avance (SA)", slug: "sa", desc: "Anticipation de salaire pour faire face aux dépenses imprévues." },
      ]
    },
    {
      title: "Crédit Cause",
      products: [
        { name: "Crédit Bien Consommation (CBC)", slug: "cbc", desc: "Acquisition de biens d'équipement, groupes électrogènes, etc." },
        { name: "Crédit à l'Autonomisation de la Femme (CAF)", slug: "caf", desc: "Produit spécifique pour l'achat de moulins, tricycles et matériels d'exploitation." },
      ]
    }
  ];

  if (allCredits.length > 0) {
    // Group by category
    const grouped = allCredits.reduce((acc: Record<string, any[]>, credit: any) => {
      const { categorie } = credit;
      if (!acc[categorie]) {
        acc[categorie] = [];
      }
      acc[categorie].push({
        name: credit.nom,
        slug: credit.slug,
        desc: credit.description
      });
      return acc;
    }, {} as Record<string, { name: string, slug: string, desc: string }[]>);

    creditCategories = Object.keys(grouped).map(key => ({
      title: key,
      products: grouped[key]
    }));
  }

  return (
    <>
      <Section variant="primary" className="py-24 md:py-32 lg:py-40 relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 bg-[url('/images/banniere-interne.png')] bg-cover bg-center bg-no-repeat z-0"></div>
        <div className="text-center max-w-3xl mx-auto relative z-10 reveal-up">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg"><TypingAnimation text="Nos Produits & Services" typeSpeed={50} /></h1>
          <p className="text-xl text-white drop-shadow-md">
            Des solutions financières conçues pour répondre à vos besoins spécifiques et accompagner votre croissance.
          </p>
        </div>
      </Section>

      {/* Credit Section */}
      <Section variant="default" id="credit">
        <div className="flex items-center mb-10 reveal-left">
          <TrendingUp className="h-10 w-10 text-primary mr-4" />
          <h2 className="text-3xl font-bold text-primary-dark"><TypingAnimation text="Nos Offres de Crédit" typeSpeed={50} /></h2>
        </div>

        <p className="text-on-surface-variant text-lg mb-12 max-w-3xl reveal-up">
          Salem Braha Finance vous propose une gamme variée de crédits adaptés à votre statut (commerçant, artisan, fonctionnaire) et à vos objectifs.
        </p>

        <div className="space-y-16">
          {creditCategories.map((category, idx) => (
            <div key={idx} className="reveal-up">
              <h3 className="text-2xl font-bold text-primary mb-6 border-b border-outline-variant pb-2">
                {category.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.products.map((product, pIdx) => (
                  <Card key={pIdx} className="h-full flex flex-col group hover:shadow-lg transition-shadow border-outline-variant/50">
                    <CardHeader>
                      <CardTitle className="text-lg text-primary-dark group-hover:text-primary transition-colors">
                        {product.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grow">
                      <p className="text-on-surface-variant text-sm">
                        {product.desc}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href={`/produits/credit/${product.slug}`}
                        className="inline-flex items-center text-accent font-medium hover:text-accent-hover transition-colors text-sm"
                      >
                        Voir les conditions
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Other Services Section */}
      <Section variant="muted" id="autres-services">
        <div className="text-center mb-16 reveal-up">
          <h2 className="text-3xl font-bold text-primary-dark mb-4"><TypingAnimation text="Plus que du financement" typeSpeed={50} /></h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
            Nous proposons un accompagnement complet à travers des services non financiers et des solutions d'épargne adaptées.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="bg-white p-8 shadow-sm border border-outline-variant/30 reveal-up delay-100">
            <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mb-6">
              <Shield className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-primary-dark mb-4">Épargne Sécurisée</h3>
            <p className="text-on-surface-variant mb-6">
              Mettez votre argent à l'abri avec nos différents comptes d'épargne. Nous offrons des solutions souples pour sécuriser vos revenus quotidiens ou préparer l'avenir, avec des conditions de rémunération attractives.
            </p>
            <ul className="space-y-2 text-sm text-on-surface-variant mb-6">
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-accent mr-2"></span> Dépôts et retraits libres</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-accent mr-2"></span> Comptes bloqués rémunérés</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-accent mr-2"></span> Tontine institutionnelle</li>
            </ul>
            <Button asChild variant="outline">
              <Link href="/contacts">Se renseigner en agence</Link>
            </Button>
          </div>

          <div className="space-y-8 reveal-up delay-200">
            <div className="bg-white p-6 shadow-sm border border-outline-variant/30 flex items-start">
              <BookOpen className="h-8 w-8 text-accent mr-4 shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-primary-dark mb-2">Formation</h3>
                <p className="text-on-surface-variant text-sm">
                  Renforcement des capacités en gestion d'entreprise, marketing de base et organisation pour nos clients entrepreneurs.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 shadow-sm border border-outline-variant/30 flex items-start">
              <Lightbulb className="h-8 w-8 text-accent mr-4 shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-primary-dark mb-2">Conseil & Éducation Financière</h3>
                <p className="text-on-surface-variant text-sm">
                  Apprentissage des bonnes pratiques de gestion de budget familial et de séparation des caisses.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 shadow-sm border border-outline-variant/30 flex items-start">
              <Handshake className="h-8 w-8 text-accent mr-4 shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-primary-dark mb-2">Appui / Assurance Conseil</h3>
                <p className="text-on-surface-variant text-sm">
                  Assistance à la gestion des risques liés à votre activité commerciale ou agricole.
                </p>
              </div>
            </div>
          </div>

        </div>
      </Section>
    </>
  );
}
