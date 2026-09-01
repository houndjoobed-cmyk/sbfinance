import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import prisma from "@/lib/prisma";
import { Section } from '@/components/layout/section';
import { Calendar, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const actualite = await prisma.actualite.findUnique({
    where: { slug: params.slug }
  });

  if (!actualite) {
    return {
      title: 'Actualité introuvable',
    };
  }

  return {
    title: actualite.titre,
    description: actualite.extrait,
  };
}

export default async function ActualiteDetailPage(props: Props) {
  const params = await props.params;
  const actualite = await prisma.actualite.findUnique({
    where: { slug: params.slug }
  });

  if (!actualite || !actualite.estPublie) {
    notFound();
  }

  return (
    <>
      <Section variant="light" className="py-12 md:py-16 border-b border-outline-variant/30">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/actualites"
            className="inline-flex items-center text-sm text-primary hover:text-primary-dark transition-colors mb-8 font-medium"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Retour aux actualités
          </Link>

          <div className="flex items-center text-on-surface-variant text-sm mb-6">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-wider text-xs mr-4">
              {actualite.categorie}
            </span>
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(actualite.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark mb-6 leading-tight">
            {actualite.titre}
          </h1>

          <p className="text-xl text-on-surface-variant mb-8 font-medium">
            {actualite.extrait}
          </p>
        </div>
      </Section>

      <Section variant="default" className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {actualite.image && (
            <div className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-outline-variant/30">
              <img
                src={actualite.image}
                alt={actualite.titre}
                className="w-full h-auto max-h-125 object-cover"
              />
            </div>
          )}

          <div
            className="prose prose-lg prose-primary max-w-none text-on-surface"
            dangerouslySetInnerHTML={{ __html: actualite.contenu }}
          />
        </div>
      </Section>
    </>
  );
}
