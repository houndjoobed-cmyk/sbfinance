'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Plus,
  Search,
  Eye,
  Edit3,
  Trash2,
  Calendar,
  Users,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Sparkles,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type Offre = {
  id: string;
  titre: string;
  slug: string;
  missions: string[];
  profil: string[];
  dateLimite: string;
  estPublie: boolean;
  createdAt: string;
  _count?: {
    candidatures: number;
  };
};

export default function OffresPage() {
  const [offres, setOffres] = useState<Offre[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    fetchOffres();
  }, []);

  const fetchOffres = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/offres');
      if (res.ok) {
        setOffres(await res.json());
      }
    } catch (error) {
      console.error('Erreur chargement offres:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePublication = async (id: string, currentState: boolean) => {
    try {
      const res = await fetch(`/api/admin/offres/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estPublie: !currentState }),
      });
      if (res.ok) {
        setOffres((prev) =>
          prev.map((o) => (o.id === id ? { ...o, estPublie: !currentState } : o))
        );
      }
    } catch (error) {
      console.error('Erreur toggle statut:', error);
    }
  };

  const handleDelete = async (id: string, titre: string) => {
    if (!window.confirm(`Voulez-vous vraiment supprimer l'offre "${titre}" et toutes ses candidatures associées ?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/offres/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setOffres((prev) => prev.filter((o) => o.id !== id));
      }
    } catch (error) {
      console.error('Erreur suppression:', error);
    }
  };

  const filteredOffres = offres.filter((o) => {
    const matchesSearch = o.titre.toLowerCase().includes(search.toLowerCase());
    if (filterStatus === 'published') return matchesSearch && o.estPublie;
    if (filterStatus === 'draft') return matchesSearch && !o.estPublie;
    return matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="p-2 bg-blue-50 text-primary rounded-lg">
              <Briefcase className="w-6 h-6" />
            </span>
            <h1 className="text-2xl font-bold text-[#111e36]">Offres d'Emploi & Recrutement</h1>
          </div>
          <p className="text-sm text-gray-500">
            Publiez et gérez vos offres d'emploi affichées sur la page Carrières du site public.
          </p>
        </div>

        <div className="flex items-center gap-3 self-stretch md:self-auto">
          <Button asChild className="bg-primary hover:bg-[#002f66] text-white">
            <Link href="/sbf-gestion/offres/nouveau">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Offre d'emploi
            </Link>
          </Button>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher par titre de poste..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterStatus === 'all'
              ? 'bg-[#111e36] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            Toutes ({offres.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('published')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterStatus === 'published'
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            Publiées ({offres.filter((o) => o.estPublie).length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('draft')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterStatus === 'draft'
              ? 'bg-amber-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            Masquées ({offres.filter((o) => !o.estPublie).length})
          </button>
        </div>
      </div>

      {/* Liste des Offres */}
      {loading ? (
        <div className="flex items-center justify-center min-h-60 bg-white rounded-xl border border-gray-200">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : filteredOffres.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-primary flex items-center justify-center mx-auto">
            <Briefcase className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-[#111e36]">Aucune offre d'emploi trouvée</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            {search
              ? 'Aucune offre ne correspond à votre recherche.'
              : "Vous n'avez pas encore publié d'offres d'emploi. Créez votre première annonce dès maintenant !"}
          </p>
          <Button asChild className="bg-primary hover:bg-[#002f66] text-white">
            <Link href="/sbf-gestion/offres/nouveau">
              <Plus className="w-4 h-4 mr-2" />
              Publier une offre d'emploi
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffres.map((offre) => {
            const candidaturesCount = offre._count?.candidatures ?? 0;

            return (
              <div
                key={offre.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5 space-y-4">
                  {/* Statut & Date */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => togglePublication(offre.id, offre.estPublie)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${offre.estPublie
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      title="Cliquez pour changer le statut"
                    >
                      {offre.estPublie ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Publiée
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-gray-400" />
                          Masquée
                        </>
                      )}
                    </button>

                    <div className="flex items-center text-xs text-gray-400 gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{offre.dateLimite}</span>
                    </div>
                  </div>

                  {/* Titre */}
                  <div>
                    <h3 className="text-lg font-bold text-[#111e36] line-clamp-2 hover:text-primary transition-colors">
                      {offre.titre}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 font-mono">/carrieres/{offre.slug}</p>
                  </div>

                  {/* Résumé Missions & Profil */}
                  <div className="space-y-1.5 text-xs text-gray-600 pt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      <span>
                        {Array.isArray(offre.missions) ? offre.missions.length : 0} missions définies
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>
                        {Array.isArray(offre.profil) ? offre.profil.length : 0} critères de profil
                      </span>
                    </div>
                  </div>

                  {/* Badge Candidatures Reçues */}
                  <div className="pt-2 border-t border-gray-100">
                    <Link
                      href={`/sbf-gestion/candidatures`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-primary text-xs font-semibold transition-colors"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>{candidaturesCount} candidature{candidaturesCount > 1 ? 's' : ''} reçue{candidaturesCount > 1 ? 's' : ''}</span>
                    </Link>
                  </div>
                </div>

                {/* Barre d'actions */}
                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/carrieres/${offre.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-primary transition-colors"
                    title="Voir l'offre sur le site public"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Voir en ligne</span>
                  </Link>

                  <div className="flex items-center gap-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="h-8 px-2.5 text-xs border-gray-200 hover:bg-white text-gray-700"
                    >
                      <Link href={`/sbf-gestion/offres/${offre.id}`}>
                        <Edit3 className="w-3.5 h-3.5 mr-1" />
                        Modifier
                      </Link>
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(offre.id, offre.titre)}
                      className="h-8 px-2 text-xs text-red-500 hover:text-red-700 hover:bg-red-50"
                      title="Supprimer cette offre"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
