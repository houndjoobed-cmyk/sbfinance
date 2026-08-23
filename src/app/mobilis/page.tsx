import React from 'react';
import type { Metadata } from 'next';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { Section } from '@/components/layout/section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Users, Leaf, BarChart3, Settings, Car, Phone } from 'lucide-react';
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "MOBILIS Horizon 2027",
  description: "L'accès à la mobilité pour chaque profil, chaque ambition. Le premier programme de crédit automobile 100% hybride au Bénin.",
};

const DEFAULT_CONTENT = {
  hero: {
    title: "MOBILIS Horizon 2027",
    subtitle: "« L'accès à la mobilité pour chaque profil, chaque ambition. »",
    description: "Roulez neuf. Roulez hybride. Sans un franc d'apport. MOBILIS est le premier programme de crédit automobile 100% hybride au Bénin, réservé en exclusivité à Salem Braha Finance.",
    image: "/images/COUVERTIRE C4.png"
  },
  avantages: {
    title: "Ce qui fait la force de MOBILIS",
    items: [
      { id: "1", title: "L'exclusivité que personne d'autre n'a.", description: "SBF est le seul établissement du Bénin autorisé à distribuer les véhicules IRETI SAS. Ailleurs, c'est tout simplement impossible d'y accéder. C'est ici, ou nulle part." },
      { id: "2", title: "Un crédit pensé pour vous, pas pour la banque.", description: "À partir de 2027, chacun trouve sa formule, de 7 à 30 millions FCFA, sur 36 à 60 mois, sans aucun apport initial." },
      { id: "3", title: "Zéro souci après l'achat.", description: "Le Garage MOBILIS Fifadji, propriété exclusive de SBF, entretient votre véhicule. Un seul point d'accès, une vraie garantie, une tranquillité totale." },
      { id: "4", title: "Un choix responsable.", description: "Toute la gamme MOBILIS roule à l'hybride, sans aucune exception." }
    ]
  },
  ciblage: {
    title: "À qui s'adresse MOBILIS ?",
    items: [
      { id: "1", title: "Les fonctionnaires de l'État", description: "Ministères, directions nationales, établissements publics." },
      { id: "2", title: "Les salariés en CDI du privé", description: "Banques, télécoms, BTP, agro-industrie, ONG, multinationales." },
      { id: "3", title: "Les agents des communes", description: "Mairies et collectivités des 77 communes du Bénin." },
      { id: "4", title: "Les cadres et dirigeants", description: "Directeurs généraux, directeurs, experts, professions libérales." }
    ]
  },
  ecologie: {
    title: "Notre engagement écologique",
    text1: "MOBILIS ne se contente pas de vendre des voitures. Le programme porte une vraie ambition environnementale, portée conjointement par Salem Braha Finance et IRETI SAS.",
    text2: "Chaque véhicule proposé, du plus abordable au plus premium, roule en motorisation hybride essence électrique. Pas de gamme thermique en option, pas d'exception selon le budget. C'est un choix assumé dès la conception du programme.",
    text3: "En rendant la mobilité hybride accessible aux fonctionnaires, aux salariés, aux communes et aux entreprises du Bénin, MOBILIS réduit concrètement l'empreinte carbone du parc automobile national, tout en offrant à chaque conducteur une consommation de carburant allégée et des coûts d'usage repensés.",
    quote: "Rouler avec MOBILIS, c'est rouler neuf, rouler serein, et rouler pour l'avenir."
  },
  chiffres: {
    title: "MOBILIS en chiffres",
    items: [
      { id: "1", value: "7M-30M", description: "De financement pour des véhicules neufs garantis de 2 à 5 ans" },
      { id: "2", value: "12%", description: "Taux par an sur des durées de 36, 48 ou 60 mois" },
      { id: "3", value: "15", description: "Jours ouvrables pour obtenir une réponse à votre dossier" },
      { id: "4", value: "Auto", description: "Prélèvement automatique : plus jamais de démarche mensuelle" }
    ]
  },
  parcours: {
    title: "Le parcours, en 3 étapes",
    items: [
      { id: "1", title: "Dépôt du dossier", description: "Je dépose mon dossier et j'obtiens une réponse en 15 jours ouvrables." },
      { id: "2", title: "Signature et livraison", description: "Je signe et mon véhicule arrive, livré en 6 à 10 semaines." },
      { id: "3", title: "En route", description: "Je roule, l'esprit tranquille, avec un entretien assuré au Garage Fifadji." }
    ]
  },
  fleet: {
    title: "Pour les entreprises : MOBILIS Fleet",
    description: "MOBILIS Fleet équipe vos flottes sans immobiliser votre trésorerie. Crédit, leasing, renouvellement ou investissement locatif : de 14 millions à plusieurs milliards de FCFA.",
    note: "Note : le dossier complet (éligibilité détaillée, tableaux de mensualités, documents Fleet, FAQ) reste disponible dans nos agences pour les échanges commerciaux approfondis.",
    buttonText: "Appel à l'action",
    buttonLink: "tel:+2290121380587"
  }
};

export default async function MobilisPage() {
  let parametres = null;

  try {
    parametres = await prisma.parametresSite.findUnique({ where: { id: 1 } }) as any;
  } catch (error) {
    console.error("Database fetch error:", error);
  }

  const content = parametres?.mobilisContenu ? { ...DEFAULT_CONTENT, ...(parametres.mobilisContenu as any) } : DEFAULT_CONTENT;

  return (
    <>
      <Section variant="primary" className="py-24 md:py-32 lg:py-40 relative overflow-hidden bg-primary-dark">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url('${content.hero.image}')` }}
        ></div>
        <div className="absolute inset-0 bg-primary-dark/70 z-0"></div>
        <div className="text-center max-w-4xl mx-auto relative z-10 reveal-up">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            <TypingAnimation text={content.hero.title} typeSpeed={50} />
          </h1>
          <p className="text-xl text-white drop-shadow-md font-medium mb-8">
            {content.hero.subtitle}
          </p>
          <p className="text-lg text-primary-light max-w-3xl mx-auto">
            {content.hero.description}
          </p>
        </div>
      </Section>

      <Section variant="default" className="py-16">
        <div className="max-w-4xl mx-auto">
          {/* Ce qui fait la force */}
          <div className="mb-16 reveal-up">
            <h2 className="text-3xl font-bold text-primary-dark mb-6 flex items-center border-b border-outline-variant pb-4">
              <ShieldCheck className="h-8 w-8 text-accent mr-4 shrink-0" />
              {content.avantages.title}
            </h2>
            <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed">
              {content.avantages.items.map((item: any) => (
                <p key={item.id}>
                  <strong className="text-primary-dark">{item.title}</strong> {item.description}
                </p>
              ))}
            </div>
          </div>

          {/* Ciblage */}
          <div className="mb-16 reveal-up">
            <h2 className="text-3xl font-bold text-primary-dark mb-6 flex items-center border-b border-outline-variant pb-4">
              <Users className="h-8 w-8 text-primary mr-4 shrink-0" />
              {content.ciblage.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.ciblage.items.map((item: any) => (
                <Card key={item.id} className="border-outline-variant/50 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-primary">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-on-surface-variant text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Engagement écologique */}
          <div className="mb-16 reveal-up">
            <div className="bg-primary/5 border border-primary/20 p-8 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Leaf className="w-40 h-40 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-primary-dark mb-6 flex items-center relative z-10">
                <Leaf className="h-8 w-8 text-accent mr-4 shrink-0" />
                {content.ecologie.title}
              </h2>
              <div className="space-y-4 text-on-surface-variant text-lg relative z-10 leading-relaxed">
                <p>{content.ecologie.text1}</p>
                <p>{content.ecologie.text2}</p>
                <p>{content.ecologie.text3}</p>
                {content.ecologie.quote && (
                  <p className="font-bold text-primary-dark italic pt-4">
                    {content.ecologie.quote}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* En chiffres */}
          <div className="mb-16 reveal-up">
            <h2 className="text-3xl font-bold text-primary-dark mb-6 flex items-center border-b border-outline-variant pb-4">
              <BarChart3 className="h-8 w-8 text-primary mr-4 shrink-0" />
              {content.chiffres.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.chiffres.items.map((item: any, idx: number) => (
                <div key={item.id || idx} className="bg-surface-muted p-6 border border-outline-variant/30 flex items-center">
                  <div className="bg-white p-3 shadow-sm mr-4 shrink-0">
                    {item.value === 'Auto' ? (
                      <Settings className="h-8 w-8 text-accent" />
                    ) : (
                      <span className="text-2xl font-bold text-accent">{item.value}</span>
                    )}
                  </div>
                  <p className="text-on-surface-variant font-medium">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Le parcours */}
          <div className="mb-16 reveal-up">
            <h2 className="text-3xl font-bold text-primary-dark mb-8 flex items-center border-b border-outline-variant pb-4">
              <Car className="h-8 w-8 text-accent mr-4 shrink-0" />
              {content.parcours.title}
            </h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-lineart-to-b before:from-transparent before:via-outline-variant before:to-transparent">
              {content.parcours.items.map((item: any, idx: number) => (
                <div key={item.id || idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${idx % 2 === 0 ? 'bg-primary' : 'bg-accent'} text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10`}>
                    {idx + 1}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 bg-white shadow-sm border border-outline-variant/30">
                    <h3 className="font-bold text-primary-dark mb-1">{item.title}</h3>
                    <p className="text-sm text-on-surface-variant">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pour les entreprises */}
          <div className="mb-16 reveal-up">
            <div className="bg-primary-dark text-white p-8 md:p-12 text-center shadow-lg">
              <h2 className="text-3xl font-bold mb-4">{content.fleet.title}</h2>
              <p className="text-lg text-primary-light max-w-2xl mx-auto mb-8">
                {content.fleet.description}
              </p>

              <div className="pt-8 border-t border-white/20">
                {content.fleet.note && (
                  <p className="text-sm text-white/70 italic mb-8">
                    {content.fleet.note}
                  </p>
                )}

                <Button asChild variant="accent" size="lg" className="px-8 py-6 text-lg rounded-full font-bold shadow-xl hover:scale-105 transition-transform">
                  <a href={content.fleet.buttonLink}>
                    <Phone className="mr-2 h-5 w-5" />
                    {content.fleet.buttonText}
                  </a>
                </Button>
              </div>
            </div>
          </div>

        </div>
      </Section>
    </>
  );
}
