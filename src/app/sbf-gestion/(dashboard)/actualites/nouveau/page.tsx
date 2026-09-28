'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Loader2, Plus, Trash2, Images, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { ImageUpload } from '@/components/admin/image-upload';
import { RichTextEditor } from '@/components/admin/rich-text-editor';

export default function ActualiteFormPage({ params }: { params?: { id?: string } }) {
  const router = useRouter();
  const routeParams = useParams();
  const id = params?.id || (routeParams?.id as string | undefined);
  const isEditing = Boolean(id);
  
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  
  const [formData, setFormData] = useState({
    titre: '',
    slug: '',
    extrait: '',
    contenu: '',
    image: '',
    images: [] as string[],
    categorie: 'Informations',
    lienExterne: '',
    estPublie: true
  });

  useEffect(() => {
    if (isEditing && id) {
      fetchActualite(id);
    }
  }, [isEditing, id]);

  const fetchActualite = async (articleId: string) => {
    try {
      const res = await fetch(`/api/admin/actualites/${articleId}`);
      if (res.ok) {
        const data = await res.json();
        setFormData({
          titre: data.titre || '',
          slug: data.slug || '',
          extrait: data.extrait || '',
          contenu: data.contenu || '',
          image: data.image || '',
          images: Array.isArray(data.images) ? data.images : [],
          categorie: data.categorie || 'Informations',
          lienExterne: data.lienExterne || '',
          estPublie: data.estPublie ?? true
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

    const url = isEditing && id ? `/api/admin/actualites/${id}` : '/api/admin/actualites';
    const method = isEditing ? 'PUT' : 'POST';

    const payload = {
      ...formData,
      images: formData.images.filter((img) => typeof img === 'string' && img.trim() !== '')
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
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

  const addGalleryImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const updateGalleryImage = (index: number, url: string) => {
    setFormData(prev => {
      const next = [...prev.images];
      next[index] = url;
      return { ...prev, images: next };
    });
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#0991b5]" /></div>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link href="/sbf-gestion/actualites" className="text-gray-500 hover:text-gray-700 mr-4">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditing ? 'Modifier l\'article' : 'Nouvel article'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Utilisez l'éditeur ci-dessous pour rédiger et mettre en forme votre article.
            </p>
          </div>
        </div>
        {/* Bouton Aperçu */}
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowPreview(!showPreview)}
          className="hidden md:flex items-center gap-2"
        >
          {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showPreview ? 'Éditeur' : 'Aperçu'}
        </Button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Métadonnées de l'article */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-2">
            Informations de l'article
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
              <input 
                required
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5] border bg-white px-3 py-2 text-lg"
                placeholder="Titre de l'actualité"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
              <select
                name="categorie"
                value={formData.categorie}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5] border bg-white px-3 py-2"
              >
                <option value="Informations">Informations</option>
                <option value="Événements">Événements</option>
                <option value="Éducation Financière">Éducation Financière</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lien externe (Optionnel)</label>
              <input 
                name="lienExterne"
                type="url"
                value={formData.lienExterne}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5] border bg-white px-3 py-2"
                placeholder="Ex: https://lien-vers-article-externe.com"
              />
              <p className="text-xs text-gray-500 mt-1">Si renseigné, l'article peut rediriger vers ce lien externe.</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Extrait court *</label>
              <textarea 
                required
                name="extrait"
                rows={2}
                value={formData.extrait}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5] border bg-white px-3 py-2"
                placeholder="Résumé de l'article affiché dans la liste des actualités"
              />
            </div>

            <div className="md:col-span-2">
              <ImageUpload 
                label="Photo de couverture"
                value={formData.image}
                onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
              />
            </div>
          </div>
        </div>

        {/* Éditeur de contenu riche */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-4">
            Contenu de l'article
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Rédigez votre article ci-dessous. Vous pouvez formater le texte (gras, italique, souligné), 
            ajouter des titres, justifier le texte, insérer des images, des listes, des citations, etc.
          </p>

          {showPreview ? (
            /* Aperçu du contenu */
            <div className="border border-gray-200 rounded-lg p-8 bg-gray-50 min-h-100">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Aperçu de l'article
              </h3>
              {formData.titre && (
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {formData.titre}
                </h1>
              )}
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: formData.contenu || '<p class="text-gray-400">Aucun contenu à afficher...</p>' }}
              />
            </div>
          ) : (
            /* Éditeur Tiptap */
            <RichTextEditor
              content={formData.contenu}
              onChange={(html) => setFormData(prev => ({ ...prev, contenu: html }))}
              placeholder="Commencez à rédiger votre article ici... Utilisez la toolbar ci-dessus pour formater votre texte, ajouter des titres, des images, etc."
            />
          )}
        </div>

        {/* GALERIE PHOTOS MULTIPLES */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Images className="w-5 h-5 text-[#0991b5]" />
                Galerie photos additionnelles
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Ces photos apparaissent dans une galerie séparée en bas de l'article (en plus des images insérées dans le contenu).
              </p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addGalleryImage}>
              <Plus className="w-4 h-4 mr-1" />
              Ajouter
            </Button>
          </div>

          {formData.images.length === 0 ? (
            <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <p className="text-xs text-gray-500">Aucune photo additionnelle dans la galerie.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {formData.images.map((imgUrl, index) => (
                <div key={index} className="p-3 bg-gray-50 border rounded-lg relative space-y-2">
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-white p-1 rounded-md shadow-sm z-10"
                    title="Supprimer cette photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <ImageUpload
                    label={`Photo #${index + 1}`}
                    value={imgUrl}
                    onChange={(url) => updateGalleryImage(index, url)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Options de publication */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <input
              id="estPublie"
              name="estPublie"
              type="checkbox"
              checked={formData.estPublie}
              onChange={handleChange}
              className="h-4 w-4 text-[#0991b5] focus:ring-[#0991b5] border-gray-300 rounded"
            />
            <label htmlFor="estPublie" className="ml-2 block text-sm text-gray-900 font-medium">
              Publier cet article immédiatement (décocher pour garder en brouillon)
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-2 pb-8">
          <Button type="button" variant="outline" onClick={() => router.push('/sbf-gestion/actualites')}>
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
