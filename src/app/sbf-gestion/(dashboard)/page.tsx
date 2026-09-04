import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { 
  Briefcase, 
  FileText, 
  Users, 
  MessageSquare, 
  PlusCircle, 
  ExternalLink, 
  Clock, 
  Landmark, 
  UserPlus, 
  MessageCircle,
  ArrowRight,
  Palette,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function DashboardHome() {
  // Récupération dynamique des statistiques du site
  let stats = {
    produitsCredit: 0,
    produitsAutres: 0,
    agences: 0,
    actualites: 0,
    demandesAttente: 0,
    candidatures: 0,
    offres: 0,
    temoignages: 0,
  };

  let recentActualites: any[] = [];
  let recentDemandes: any[] = [];

  try {
    const [
      creditCount,
      autreCount,
      agenceCount,
      actualiteCount,
      demandesCount,
      candidaturesCount,
      offresCount,
      temoignagesCount,
      latestNews,
      latestContacts
    ] = await Promise.all([
      prisma.produitCredit.count().catch(() => 0),
      prisma.produit.count().catch(() => 0),
      prisma.agence.count().catch(() => 0),
      prisma.actualite.count().catch(() => 0),
      prisma.demandeContact.count({ where: { estTraite: false } }).catch(() => 0),
      prisma.candidature.count().catch(() => 0),
      prisma.offreEmploi.count().catch(() => 0),
      prisma.temoignage.count().catch(() => 0),
      prisma.actualite.findMany({ take: 4, orderBy: { createdAt: 'desc' } }).catch(() => []),
      prisma.demandeContact.findMany({ take: 4, orderBy: { createdAt: 'desc' } }).catch(() => []),
    ]);

    stats = {
      produitsCredit: creditCount,
      produitsAutres: autreCount,
      agences: agenceCount,
      actualites: actualiteCount,
      demandesAttente: demandesCount,
      candidatures: candidaturesCount,
      offres: offresCount,
      temoignages: temoignagesCount,
    };

    recentActualites = latestNews;
    recentDemandes = latestContacts;
  } catch (err) {
    console.error('Erreur chargement dashboard:', err);
  }

  return (
    <div className="space-y-8">
      {/* Header avec action rapide vers le site public */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord SBF</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gérez facilement l'ensemble du contenu institutionnel de Salem Braha Finance.
          </p>
        </div>
        <Button asChild variant="outline" className="gap-2">
          <Link href="/" target="_blank">
            <ExternalLink className="w-4 h-4" />
            Voir le site public
          </Link>
        </Button>
      </div>

      {/* Cartes Statistiques Dynamiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 border-l-4 border-l-[#0991b5] flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Crédits & Produits</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.produitsCredit + stats.produitsAutres}</p>
            <Link href="/sbf-gestion/produits" className="text-xs text-[#0991b5] hover:underline mt-1 inline-block">
              Gérer les fiches →
            </Link>
          </div>
          <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center text-[#0991b5]">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 border-l-4 border-l-amber-500 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Comptes & Épargne</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">Actif</p>
            <Link href="/sbf-gestion/contenu-epargne" className="text-xs text-amber-600 hover:underline mt-1 inline-block">
              Gérer les packs →
            </Link>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <Landmark className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 border-l-4 border-l-emerald-500 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Actualités</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.actualites}</p>
            <Link href="/sbf-gestion/actualites" className="text-xs text-emerald-600 hover:underline mt-1 inline-block">
              Voir tous les articles →
            </Link>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 border-l-4 border-l-blue-600 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Offres d'Emploi</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.offres}</p>
            <Link href="/sbf-gestion/offres" className="text-xs text-blue-600 hover:underline mt-1 inline-block">
              {stats.candidatures} candidature{stats.candidatures > 1 ? 's' : ''} →
            </Link>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 border-l-4 border-l-purple-500 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Demandes Contacts</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.demandesAttente}</p>
            <Link href="/sbf-gestion/contacts" className="text-xs text-purple-600 hover:underline mt-1 inline-block">
              Consulter les messages →
            </Link>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Raccourcis d'actions rapides façon WordPress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-[#0991b5]" />
          Actions Rapides
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <Link
            href="/sbf-gestion/produits/credit/nouveau"
            className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 hover:border-[#0991b5] hover:bg-cyan-50/40 text-center transition-all group"
          >
            <CreditCard className="w-5 h-5 text-gray-600 group-hover:text-[#0991b5] mb-2" />
            <span className="text-xs font-medium text-gray-700 group-hover:text-[#0991b5]">Nouveau Crédit</span>
          </Link>

          <Link
            href="/sbf-gestion/offres/nouveau"
            className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 hover:border-blue-600 hover:bg-blue-50/40 text-center transition-all group"
          >
            <Briefcase className="w-5 h-5 text-gray-600 group-hover:text-blue-600 mb-2" />
            <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600">Nouvelle Offre</span>
          </Link>

          <Link
            href="/sbf-gestion/actualites/nouveau"
            className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-center transition-all group"
          >
            <FileText className="w-5 h-5 text-gray-600 group-hover:text-emerald-600 mb-2" />
            <span className="text-xs font-medium text-gray-700 group-hover:text-emerald-600">Nouvel Article</span>
          </Link>

          <Link
            href="/sbf-gestion/contenu-epargne"
            className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 hover:border-amber-500 hover:bg-amber-50/40 text-center transition-all group"
          >
            <Landmark className="w-5 h-5 text-gray-600 group-hover:text-amber-600 mb-2" />
            <span className="text-xs font-medium text-gray-700 group-hover:text-amber-600">Gérer l'Épargne</span>
          </Link>

          <Link
            href="/sbf-gestion/agences/nouveau"
            className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50/40 text-center transition-all group"
          >
            <Users className="w-5 h-5 text-gray-600 group-hover:text-blue-600 mb-2" />
            <span className="text-xs font-medium text-gray-700 group-hover:text-blue-600">Nouvelle Agence</span>
          </Link>

          <Link
            href="/sbf-gestion/temoignages/nouveau"
            className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 hover:border-rose-500 hover:bg-rose-50/40 text-center transition-all group"
          >
            <MessageCircle className="w-5 h-5 text-gray-600 group-hover:text-rose-600 mb-2" />
            <span className="text-xs font-medium text-gray-700 group-hover:text-rose-600">Nouveau Témoignage</span>
          </Link>

          <Link
            href="/sbf-gestion/contenu-accueil"
            className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50/40 text-center transition-all group"
          >
            <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 mb-2" />
            <span className="text-xs font-medium text-gray-700 group-hover:text-indigo-600">Bannière & Accueil</span>
          </Link>

          <Link
            href="/sbf-gestion/apparence"
            className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 hover:border-sky-600 hover:bg-sky-50/40 text-center transition-all group"
          >
            <Palette className="w-5 h-5 text-gray-600 group-hover:text-sky-600 mb-2" />
            <span className="text-xs font-medium text-gray-700 group-hover:text-sky-600">Thème & Style</span>
          </Link>
        </div>
      </div>

      {/* Colonnes doubles : Derniers articles et Dernières demandes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Derniers articles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0991b5]" />
              Derniers Articles
            </h2>
            <Link href="/sbf-gestion/actualites" className="text-xs text-[#0991b5] hover:underline flex items-center gap-1 font-semibold">
              Tous les articles <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {recentActualites.length === 0 ? (
            <p className="text-xs text-gray-500 py-6 text-center">Aucun article publié pour l'instant.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentActualites.map((art) => (
                <div key={art.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{art.titre}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {art.categorie} • {new Date(art.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <Link
                    href={`/sbf-gestion/actualites/${art.id}`}
                    className="text-xs font-semibold text-[#0991b5] hover:text-[#077a99] bg-cyan-50 px-2.5 py-1 rounded-md shrink-0"
                  >
                    Modifier
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dernières demandes de contacts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-600" />
              Derniers Messages Reçus
            </h2>
            <Link href="/sbf-gestion/contacts" className="text-xs text-purple-600 hover:underline flex items-center gap-1 font-semibold">
              Tous les messages <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {recentDemandes.length === 0 ? (
            <p className="text-xs text-gray-500 py-6 text-center">Aucune demande reçue pour l'instant.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentDemandes.map((demande) => (
                <div key={demande.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {demande.nom} {demande.prenom || ''}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">
                      {demande.telephone || demande.email || 'Sans contact'} • {new Date(demande.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 font-medium ${
                    demande.estTraite ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {demande.estTraite ? 'Traité' : 'En attente'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
