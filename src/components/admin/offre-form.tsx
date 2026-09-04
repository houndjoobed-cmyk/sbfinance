'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Briefcase, 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OffreFormProps {
  initialData?: {
    id?: string;
    titre: string;
    slug: string;
    dateLimite: string;
    estPublie: boolean;
    missions: string[];
    profil: string[];
  };
  isEditing?: boolean;
}

export function OffreForm({ initialData, isEditing = false }: OffreFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    titre: initialData?.titre || '',
    slug: initialData?.slug || '',
    dateLimite: initialData?.dateLimite || '',
    estPublie: initialData?.estPublie ?? true,
  });

  const [missions, setMissions] = useState<string[]>(
    initialData?.missions && initialData.missions.length > 0 
      ? initialData.missions 
      : ['']
  );

  const [profil, setProfil] = useState<string[]>(
    initialData?.profil && initialData.profil.length > 0 
      ? initialData.profil 
      : ['']
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-slugify
  const handleTitreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => {
      // Auto-remplir le slug si c'est une création ou si le slug n'a pas été personnalisé manuellement
      if (!isEditing || !prev.slug) {
        const autoSlug = val
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        return { ...prev, titre: val, slug: autoSlug };
      }
      return { ...prev, titre: val };
    });
  };

  // Missions handlers
  const handleMissionChange = (index: number, val: string) => {
    setMissions((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const addMission = () => {
    setMissions((prev) => [...prev, '']);
  };

  const removeMission = (index: number) => {
    if (missions.length <= 1) {
      setMissions(['']);
      return;
    }
    setMissions((prev) => prev.filter((_, i) => i !== index));
  };

  // Profil handlers
  const handleProfilChange = (index: number, val: string) => {
    setProfil((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const addProfil = () => {
    setProfil((prev) => [...prev, '']);
  };

  const removeProfil = (index: number) => {
    if (profil.length <= 1) {
      setProfil(['']);
      return;
    }
    setProfil((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titre.trim()) {
      setError('Veuillez saisir le titre de l\'offre.');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const filteredMissions = missions.map((m) => m.trim()).filter((m) => m.length > 0);
      const filteredProfil = profil.map((p) => p.trim()).filter((p) => p.length > 0);

      const payload = {
        ...formData,
        missions: filteredMissions,
        profil: filteredProfil,
      };

      const url = isEditing && initialData?.id 
        ? `/api/admin/offres/${initialData.id}` 
        : '/api/admin/offres';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Erreur lors de la sauvegarde');
      }

      router.push('/sbf-gestion/offres');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-lg text-gray-500 hover:text-gray-900">
            <Link href="/sbf-gestion/offres">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-[#111e36]">
              {isEditing ? "Modifier l'Offre d'Emploi" : "Créer une Nouvelle Offre d'Emploi"}
            </h1>
            <p className="text-sm text-gray-500">
              Renseignez les détails du poste, les missions et le profil requis.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            asChild
            type="button"
            variant="outline"
            className="flex-1 sm:flex-none border-gray-300 text-gray-700"
          >
            <Link href="/sbf-gestion/offres">Annuler</Link>
          </Button>

          <Button
            type="submit"
            disabled={saving}
            className="flex-1 sm:flex-none bg-primary hover:bg-[#002f66] text-white"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {isEditing ? 'Enregistrer les modifications' : "Publier l'offre"}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Erreur */}
      {error && (
        <div className="p-4 bg-red-50 text-red-800 rounded-xl border border-red-200 flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Section 1 : Informations Clés */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
        <h2 className="text-base font-bold text-[#111e36] flex items-center gap-2 border-b pb-3">
          <Briefcase className="w-5 h-5 text-primary" />
          Informations Générales
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Titre */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Titre du poste <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Conseiller Commercial Microfinance, Responsable d'Agence..."
              value={formData.titre}
              onChange={handleTitreChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-gray-900"
            />
          </div>

          {/* Slug URL */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
              Identifiant URL (Slug)
              <span className="text-xs font-normal text-gray-400">(généré automatiquement)</span>
            </label>
            <div className="flex items-center">
              <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-200 rounded-l-lg text-xs text-gray-500 select-none">
                /carrieres/
              </span>
              <input
                type="text"
                placeholder="conseiller-commercial"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-r-lg text-xs font-mono bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          {/* Date Limite */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-400" />
              Date limite de candidature
            </label>
            <input
              type="text"
              placeholder="Ex: 30 Avril 2026, 15 Mai 2026..."
              value={formData.dateLimite}
              onChange={(e) => setFormData((prev) => ({ ...prev, dateLimite: e.target.value }))}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Statut de publication */}
          <div className="md:col-span-2 pt-2">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-gray-900">Visibilité sur le site public</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Si activé, l'offre apparaîtra immédiatement sur la page /carrieres et acceptera les candidatures en ligne.
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.estPublie}
                  onChange={(e) => setFormData((prev) => ({ ...prev, estPublie: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 : Missions Principales */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <h2 className="text-base font-bold text-[#111e36] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Missions Principales du Poste
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Listez les responsabilités et activités confiées à la personne recrutée.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addMission}
            className="text-xs border-primary text-primary hover:bg-blue-50"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Ajouter une mission
          </Button>
        </div>

        <div className="space-y-3">
          {missions.map((mission, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-50 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                {index + 1}
              </span>
              <input
                type="text"
                placeholder={`Description de la mission n°${index + 1}...`}
                value={mission}
                onChange={(e) => handleMissionChange(index, e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button
                type="button"
                onClick={() => removeMission(index)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Supprimer cette mission"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3 : Profil Recherché & Compétences */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <h2 className="text-base font-bold text-[#111e36] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              Profil Recherché & Compétences
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Diplômes, expériences professionnelles, compétences techniques ou qualités requises.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addProfil}
            className="text-xs border-primary text-primary hover:bg-blue-50"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Ajouter un critère
          </Button>
        </div>

        <div className="space-y-3">
          {profil.map((critere, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-50 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0">
                {index + 1}
              </span>
              <input
                type="text"
                placeholder={`Critère de profil ou compétence n°${index + 1}...`}
                value={critere}
                onChange={(e) => handleProfilChange(index, e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button
                type="button"
                onClick={() => removeProfil(index)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Supprimer ce critère"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bouton de validation en bas */}
      <div className="flex justify-end gap-3 pt-2">
        <Button asChild type="button" variant="outline" className="border-gray-300 text-gray-700">
          <Link href="/sbf-gestion/offres">Annuler</Link>
        </Button>
        <Button type="submit" disabled={saving} className="bg-primary hover:bg-[#002f66] text-white">
          {saving ? 'Enregistrement...' : isEditing ? 'Enregistrer les modifications' : "Publier l'offre d'emploi"}
        </Button>
      </div>
    </form>
  );
}
