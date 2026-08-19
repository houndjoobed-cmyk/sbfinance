import React from 'react';
import { Section } from '@/components/layout/section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Landmark, Handshake, Lightbulb, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export function ProductsPreview() {
  const products = [
    {
      title: "Crédit",
      description: "Solutions de financement pour vos besoins de roulement, de consommation ou d'investissement.",
      icon: <Wallet className="h-10 w-10 text-primary" />,
      link: "/produits/credit"
    },
    {
      title: "Épargne",
      description: "Sécurisez votre avenir avec nos produits d'épargne: Houenoussou, Allodo, Ahossou, Zédaga et Kondokpo.",
      icon: <Landmark className="h-10 w-10 text-primary" />,
      link: "/produits/epargne"
    },
    {
      title: "Appui",
      description: "Un soutien sur-mesure pour développer vos activités et pérenniser votre croissance.",
      icon: <Handshake className="h-10 w-10 text-primary" />,
      link: "/produits/appui"
    },
    {
      title: "Conseil",
      description: "Expertise et accompagnement stratégique pour la gestion de votre entreprise.",
      icon: <Lightbulb className="h-10 w-10 text-primary" />,
      link: "/produits/conseil"
    },
    {
      title: "Formation",
      description: "Renforcez vos compétences avec nos programmes d'éducation financière et entrepreneuriale.",
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
      link: "/produits/formation"
    }
  ];

  return (
    <Section variant="default">
      <div className="text-center max-w-3xl mx-auto mb-16 reveal-up">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">Nos Produits & Services</h2>
        <p className="text-on-surface-variant text-lg">
          Découvrez notre gamme complète de solutions financières et d'accompagnement conçues pour répondre à vos besoins spécifiques.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <Card key={index} className={`flex flex-col h-full reveal-up delay-${(index % 3 + 1) * 100}`}>
            <CardHeader className="pb-4">
              <div className="bg-surface-muted w-20 h-20 rounded-full flex items-center justify-center mb-4">
                {product.icon}
              </div>
              <CardTitle className="text-primary-dark">{product.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-base text-on-surface-variant">
                {product.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={product.link}>Découvrir</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
        
        {/* Call to action card to complete the grid */}
        <Card className="flex flex-col h-full bg-primary text-white hover-lift reveal-up delay-100 border-none">
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-2xl">Besoin d'aide pour choisir ?</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <CardDescription className="text-primary-light text-base">
              Nos conseillers sont à votre disposition dans toutes nos agences pour vous orienter vers la solution la plus adaptée.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Button asChild variant="accent" className="w-full">
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Section>
  );
}
