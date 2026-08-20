'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { ImageUpload } from '@/components/admin/image-upload';

export default function ActualiteFormPage({ params }: { params?: { id: string } }) {
  const isEditing = !!params?.id;
  const router = useRouter();
  
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    titre: '',
    slug: '',
    extrait: '',
    contenu: '',
    image: '',
    categorie: 'Informations',
    estPublie: true
  });

  useEffect(() => {
    if (isEditing && params?.id) {
      fetchActualite(params.id);
    }
  }, [isEditing, params]);

  const fetchActualite = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/actualites/${id}`);
      if (res.ok) {
        const data = await res.json();
        setFormData({
          titre: data.titre || '',
          slug: data.slug || '',
          extrait: data.extrait || '',
          contenu: data.contenu || '',
          image: data.image || '',
          categorie: data.categorie || 'Informations',
          estPublie: data.estPublie
        });
      }
    } catch (err) {
      setError('Erreur lors du chargement de l\'article.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const url = isEditing ? `/api/admin/actualites/${params.id}` : '/api/admin/actualites';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erreur lors de la sauvegarde');
      }

      router.push('/sbf-gestion/actualites');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#0991b5]" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <Link href="/sbf-gestion/actualites" className="text-gray-500 hover:text-gray-700 mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? 'Modifier l\'article' : 'Nouvel article'}
        </h1>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
            <input 
              required
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5]"
              placeholder="Titre de l'actualité"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
            <select
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5]"
            >
              <option value="Informations">Informations</option>
              <option value="Événements">Événements</option>
              <option value="Éducation Financière">Éducation Financière</option>
            </select>
          </div>

          <div>
            <ImageUpload 
              label="Image de l'article (Optionnel)"
              value={formData.image}
              onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Extrait court *</label>
            <textarea 
              required
              name="extrait"
              rows={2}
              value={formData.extrait}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5]"
              placeholder="Résumé de l'article pour la page d'accueil"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Contenu complet *</label>
            <textarea 
              required
              name="contenu"
              rows={10}
              value={formData.contenu}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5]"
              placeholder="Contenu détaillé (supporte le HTML basique ou Markdown plus tard)"
            />
          </div>

          <div className="md:col-span-2 flex items-center">
            <input
              id="estPublie"
              name="estPublie"
              type="checkbox"
              checked={formData.estPublie}
              onChange={handleChange}
              className="h-4 w-4 text-[#0991b5] focus:ring-[#0991b5] border-gray-300 rounded"
            />
            <label htmlFor="estPublie" className="ml-2 block text-sm text-gray-900">
              Publier cet article immédiatement (décocher pour garder en brouillon)
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <Button type="button" variant="outline" className="mr-4" onClick={() => router.push('/sbf-gestion/actualites')}>
            Annuler
          </Button>
          <Button type="submit" variant="accent" disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {isEditing ? 'Mettre à jour' : 'Créer l\'article'}
          </Button>
        </div>
      </form>
    </div>
  );
}
