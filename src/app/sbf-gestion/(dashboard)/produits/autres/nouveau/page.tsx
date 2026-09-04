'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { ImageUpload } from '@/components/admin/image-upload';

export default function ProduitAutreFormPage({ params }: { params?: { id?: string } }) {
  const router = useRouter();
  const routeParams = useParams();
  const id = params?.id || (routeParams?.id as string | undefined);
  const isEditing = Boolean(id);
  
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    nom: '',
    slug: '',
    type: 'Epargne',
    description: '',
    contenuDetaille: '',
    image: '',
  });

  useEffect(() => {
    if (isEditing && id) {
      fetchProduit(id);
    }
  }, [isEditing, id]);

  const fetchProduit = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/produits/autres/${id}`);
      if (res.ok) {
        const data = await res.json();
        setFormData({
          nom: data.nom || '',
          slug: data.slug || '',
          type: data.type || 'Epargne',
          description: data.description || '',
          contenuDetaille: data.contenuDetaille || '',
          image: data.image || '',
        });
      }
    } catch (err) {
      setError('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const url = isEditing && id ? `/api/admin/produits/autres/${id}` : '/api/admin/produits/autres';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Erreur lors de la sauvegarde');

      router.push('/sbf-gestion/produits');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#0991b5]" /></div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <Link href="/sbf-gestion/produits" className="text-gray-500 hover:text-gray-700 mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? 'Modifier le Produit' : 'Nouveau Produit (Épargne, Appui...)'}
        </h1>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom du produit *</label>
            <input required name="nom" value={formData.nom} onChange={handleChange} className="w-full border-gray-300 rounded-md focus:ring-[#0991b5] border bg-white px-3 py-2" placeholder="Ex: Dépôt à Terme (DAT)" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type de produit *</label>
            <select name="type" value={formData.type} onChange={handleChange} className="w-full border-gray-300 rounded-md focus:ring-[#0991b5] border bg-white px-3 py-2">
              <option value="Epargne">Épargne</option>
              <option value="Appui">Appui</option>
              <option value="Conseil">Conseil</option>
              <option value="Formation">Formation</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description courte *</label>
            <textarea required name="description" rows={2} value={formData.description} onChange={handleChange} className="w-full border-gray-300 rounded-md focus:ring-[#0991b5] border bg-white px-3 py-2" placeholder="Résumé de l'offre" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Contenu détaillé *</label>
            <textarea required name="contenuDetaille" rows={6} value={formData.contenuDetaille} onChange={handleChange} className="w-full border-gray-300 rounded-md focus:ring-[#0991b5] border bg-white px-3 py-2" placeholder="Explication détaillée des avantages, fonctionnement..." />
          </div>
          <div className="md:col-span-2">
            <ImageUpload 
              label="Image d'illustration (Optionnel)"
              value={formData.image}
              onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <Button type="button" variant="outline" className="mr-4" onClick={() => router.push('/sbf-gestion/produits')}>Annuler</Button>
          <Button type="submit" variant="accent" disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {isEditing ? 'Mettre à jour' : 'Créer le produit'}
          </Button>
        </div>
      </form>
    </div>
  );
}
