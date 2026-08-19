import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

// Mock data to simulate database
const creditProductsData = {
  "cg": {
    name: "Crédit de Groupe (CG)",
    category: "Besoin de fonds de roulement",
    target: "Regroupements de femmes et d'hommes (marchés, associations locales) ayant une activité génératrice de revenus.",
    description: "Le Crédit de Groupe est conçu pour soutenir les membres d'un groupe solidaire qui se portent caution mutuelle. Il favorise l'entraide et permet l'accès au financement pour le renforcement des activités commerciales.",
    conditions: [
      "Faire partie d'un groupe de caution solidaire",
      "Exercer une activité génératrice de revenus (AGR)",
      "Avoir une capacité de remboursement prouvée"
    ],
    documents: [
      "Photos d'identité",
      "Copie de la pièce d'identité",
      "Justificatif de domicile (facture SBEE/SONEB ou attestation)",
      "Engagement du groupe de solidarité"
    ],
    minMaxAmount: "De 50.000 à 500.000 FCFA par membre",
    duration: "Maximum 12 mois",
    rate: "Taux dégressif compétitif (détails en agence)"
  },
  "gcs": {
    name: "Garantie de Caution Solidaire (GCS)",
    category: "Besoin de fonds de roulement",
    target: "Petits entrepreneurs et commerçants ayant besoin d'un financement rapide sans pouvoir fournir une garantie matérielle lourde.",
    description: "Ce crédit est accordé sur la base de la caution mutuelle d'autres membres ou commerçants. Il lève la barrière de la garantie matérielle pour faciliter le développement de vos affaires.",
    conditions: [
      "Avoir l'aval d'autres clients ou membres solvables",
      "Historique de commerce justifié",
      "Avoir une épargne de garantie minimale"
    ],
    documents: [
      "Photos d'identité",
      "Copie de la pièce d'identité",
      "Justificatif de domicile",
      "Fiche d'engagement des cautions"
    ],
    minMaxAmount: "De 100.000 à 1.000.000 FCFA",
    duration: "Maximum 12 mois",
    rate: "À consulter en agence"
  },
  "cicp": {
    name: "Crédit Individuel à Caution Physique (CICP)",
    category: "Besoin de fonds de roulement",
    target: "Micro-entrepreneurs, artisans et commerçants établis.",
    description: "Un financement sur mesure pour augmenter votre stock ou améliorer vos outils de travail, garanti par l'engagement d'une personne physique solvable.",
    conditions: [
      "Avoir un garant (avaliseur) solvable",
      "Preuve d'existence de l'activité (visite terrain)",
      "Capacité de remboursement vérifiée"
    ],
    documents: [
      "Documents d'identité de l'emprunteur et du garant",
      "Justificatif de résidence",
      "Titres de propriété ou quittance de loyer de la boutique/atelier"
    ],
    minMaxAmount: "Jusqu'à 2.000.000 FCFA",
    duration: "De 3 à 18 mois",
    rate: "Taux fixe avantageux"
  },
  "cf": {
    name: "Crédit aux Fonctionnaires (CF)",
    category: "Crédit à la consommation",
    target: "Agents de la fonction publique (APE, AME, fonctionnaires d'État) et salariés du privé domiciliant leur salaire.",
    description: "Un prêt adapté à la stabilité de vos revenus pour financer vos projets personnels (scolarité, équipement, construction).",
    conditions: [
      "Être salarié (public ou privé)",
      "Domiciliation irrévocable du salaire ou attestation de cession de salaire",
      "Taux d'endettement respecté"
    ],
    documents: [
      "3 derniers bulletins de paie",
      "Attestation de présence au poste",
      "Pièce d'identité et photos",
      "Engagement de domiciliation de salaire"
    ],
    minMaxAmount: "En fonction de la quotité cessible",
    duration: "Jusqu'à 36 mois",
    rate: "Taux préférentiel salarié"
  }
};

export function generateStaticParams() {
  return Object.keys(creditProductsData).map((slug) => ({
    slug,
  }));
}

type Props = {
  params: { slug: string }
};

export default function ProductDetailPage({ params }: Props) {
  // In a real app, await params if needed by Next.js 15+ 
  // Since we are using Next 14/15 App router, we use the params directly or with React.use(params)
  // For simplicity here, we assume synchronous params access or we'll wrap it if needed.
  // We'll use a type cast to ensure compatibility with Next 15 if needed.
  const slug = params.slug as keyof typeof creditProductsData;
  const product = creditProductsData[slug];

  if (!product) {
    notFound();
  }

  return (
    <>
      <Section variant="light" className="pt-[160px] pb-16 md:pt-[200px] md:pb-24 border-b border-outline-variant">
        <div className="max-w-4xl mx-auto">
          <Link href="/produits#credit" className="inline-flex items-center text-on-surface-variant hover:text-primary transition-colors mb-6 font-medium text-sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à la liste des crédits
          </Link>
          
          <div className="flex items-center mb-4">
            <span className="bg-accent/10 text-accent font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
              {product.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-primary-dark mb-6">{product.name}</h1>
          <p className="text-xl text-on-surface-variant leading-relaxed">
            {product.description}
          </p>
        </div>
      </Section>

      <Section variant="default">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Main Details */}
          <div className="md:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-primary-dark mb-6 flex items-center">
                <CheckCircle2 className="h-6 w-6 text-primary mr-3" />
                Cible & Éligibilité
              </h2>
              <div className="bg-surface-muted p-6 rounded-xl border border-outline-variant/50">
                <p className="font-medium text-on-surface mb-4">Ce produit s'adresse à :</p>
                <p className="text-on-surface-variant mb-6">{product.target}</p>
                
                <p className="font-medium text-on-surface mb-3">Conditions préalables :</p>
                <ul className="space-y-3">
                  {product.conditions.map((cond, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-on-surface-variant">{cond}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary-dark mb-6 flex items-center">
                <CheckCircle2 className="h-6 w-6 text-primary mr-3" />
                Pièces à fournir
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.documents.map((doc, idx) => (
                  <li key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-outline-variant/30 text-sm text-on-surface-variant flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar / Parameters */}
          <div>
            <div className="bg-primary-dark text-white rounded-2xl p-6 shadow-lg sticky top-24">
              <h3 className="text-xl font-bold mb-6 border-b border-white/20 pb-4">Caractéristiques</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-primary-light text-sm mb-1">Montant</p>
                  <p className="font-medium">{product.minMaxAmount}</p>
                </div>
                
                <div>
                  <p className="text-primary-light text-sm mb-1">Durée</p>
                  <p className="font-medium">{product.duration}</p>
                </div>
                
                <div>
                  <p className="text-primary-light text-sm mb-1">Taux & Remboursement</p>
                  <p className="font-medium">{product.rate}</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <Button asChild variant="accent" className="w-full mb-3">
                  <Link href="/contact">Demander ce crédit</Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-white text-white hover:bg-white hover:text-primary-dark">
                  <Link href="/reseau">Trouver une agence</Link>
                </Button>
              </div>

              <div className="mt-6 flex items-start text-xs text-primary-light bg-black/20 p-3 rounded-lg">
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                <p>Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.</p>
              </div>
            </div>
          </div>

        </div>
      </Section>
    </>
  );
}
