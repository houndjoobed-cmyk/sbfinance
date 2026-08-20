import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, AlertCircle, Target, FileText } from 'lucide-react';
import Link from 'next/link';
import prisma from "@/lib/prisma";

export async function generateStaticParams() {
  const products = await prisma.produitCredit.findMany({
    select: { slug: true }
  });
  return products.map((p: any) => ({
    slug: p.slug,
  }));
}

type Props = {
  params: { slug: string }
};

export default async function ProductDetailPage({ params }: Props) {
  const slug = params.slug;
  const product = await prisma.produitCredit.findUnique({
    where: { slug }
  });

  if (!product) {
    notFound();
  }

  // Parse JSON fields safely
  let conditions: string[] = [];
  let documents: string[] = [];
  try {
    conditions = (product.conditions as unknown as string[]) || [];
    documents = (product.piecesAFournir as unknown as string[]) || [];
  } catch (e) {
    console.error("Error parsing JSON fields", e);
  }

  // Format min/max amount and duration
  const formatAmount = (min: number | null, max: number | null) => {
    if (min && max) return `De ${min.toLocaleString('fr-FR')} à ${max.toLocaleString('fr-FR')} FCFA`;
    if (min) return `À partir de ${min.toLocaleString('fr-FR')} FCFA`;
    if (max) return `Jusqu'à ${max.toLocaleString('fr-FR')} FCFA`;
    return "À consulter en agence";
  };

  const formatDuration = (min: number | null, max: number | null) => {
    if (min && max) return `De ${min} à ${max} mois`;
    if (min) return `À partir de ${min} mois`;
    if (max) return `Maximum ${max} mois`;
    return "À consulter en agence";
  };

  const formattedAmount = formatAmount(product.montantMin, product.montantMax);
  const formattedDuration = formatDuration(product.dureeMinMois, product.dureeMaxMois);

  return (
    <>
      <Section variant="primary" className="pt-40 pb-16 md:pt-50 md:pb-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <Link href="/produits#credit" className="inline-flex items-center text-on-surface-variant hover:text-primary transition-colors mb-6 font-medium text-sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à la liste des crédits
          </Link>

          <div className="flex items-center mb-4">
            <span className="bg-accent/10 text-accent font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
              {product.categorie}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-primary-dark mb-6">
            <TypingAnimation text={product.nom} typeSpeed={50} />
          </h1>
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
                <CheckCircle2 className="h-6 w-6 text-accent mr-3 shrink-0" />
                Conditions d'éligibilité
              </h2>
              <div className="bg-surface-muted p-6 rounded-xl border border-outline-variant/50">
                <p className="font-medium text-on-surface mb-4">Ce produit s'adresse à :</p>
                <p className="text-on-surface-variant mb-6">{product.cible}</p>

                <p className="font-medium text-on-surface mb-3">Conditions préalables :</p>
                <ul className="space-y-3">
                  {conditions.map((cond, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 mr-3 shrink-0"></span>
                      <span className="text-on-surface-variant">{cond}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary-dark mb-6 flex items-center">
                <CheckCircle2 className="h-6 w-6 text-primary mr-3" />
                <TypingAnimation text="Pièces à fournir" typeSpeed={50} />
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {documents.map((doc, idx) => (
                  <li key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-outline-variant/30 text-sm text-on-surface-variant flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 shrink-0"></div>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            {product.garantieExigee && (
              <div>
                <h2 className="text-2xl font-bold text-primary-dark mb-6 flex items-center">
                  <CheckCircle2 className="h-6 w-6 text-primary mr-3" />
                  <TypingAnimation text="Garanties exigées" typeSpeed={50} />
                </h2>
                <div className="bg-white p-6 rounded-xl border border-outline-variant/50">
                  <p className="text-on-surface-variant">{product.garantieExigee}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Parameters */}
          <div>
            <div className="bg-primary-dark text-white rounded-2xl p-6 shadow-lg sticky top-24">
              <h3 className="text-xl font-bold mb-6 border-b border-white/20 pb-4">Caractéristiques</h3>

              <div className="space-y-6">
                <div>
                  <p className="text-primary-light text-sm mb-1">Montant</p>
                  <p className="font-medium">{formattedAmount}</p>
                </div>

                <div>
                  <p className="text-primary-light text-sm mb-1">Durée</p>
                  <p className="font-medium">{formattedDuration}</p>
                </div>

                <div>
                  <p className="text-primary-light text-sm mb-1">Taux & Remboursement</p>
                  <p className="font-medium">{product.tauxInteretAnnuel || "Consulter en agence"} ({product.periodicite || "Mensuelle"})</p>
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
                <AlertCircle className="h-4 w-4 mr-2 shrink-0 mt-0.5" />
                <p>Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.</p>
              </div>
            </div>
          </div>

        </div>
      </Section>
    </>
  );
}
