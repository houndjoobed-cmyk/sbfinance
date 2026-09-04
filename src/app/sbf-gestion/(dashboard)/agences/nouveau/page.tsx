'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AgenceFormPage({ params }: { params?: { id?: string } }) {
  const router = useRouter();
  const routeParams = useParams();
  const id = params?.id || (routeParams?.id as string | undefined);
  const isEditing = Boolean(id);
  
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    nom: '',
    adresse: '',
    coordonneesGps: '',
    telephones: '',
    horaires: 'Lundi au Vendredi: 08h00 - 17h00\nSamedi: 09h00 - 13h00',
    estSiege: false
  });

  useEffect(() => {
    if (isEditing && id) {
      fetchAgence(id);
    }
  }, [isEditing, id]);

  const fetchAgence = async (agenceId: string) => {
    try {
      const res = await fetch(`/api/admin/agences/${agenceId}`);
      if (res.ok) {
        const data = await res.json();
        setFormData({
          nom: data.nom || '',
          adresse: data.adresse || '',
          coordonneesGps: data.coordonneesGps || '',
          telephones: Array.isArray(data.telephones) ? data.telephones.join('\n') : '',
          horaires: data.horaires || '',
          estSiege: data.estSiege
        });
      }
    } catch (err) {
      setError('Erreur lors du chargement.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const url = isEditing && id ? `/api/admin/agences/${id}` : '/api/admin/agences';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const payload = {
        ...formData,
        telephones: formData.telephones.split('\n').filter(t => t.trim() !== '')
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Erreur lors de la sauvegarde');

      router.push('/sbf-gestion/agences');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        <Link href="/sbf-gestion/agences" className="text-gray-500 hover:text-gray-700 mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? 'Modifier l\'agence' : 'Nouvelle agence'}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'agence *</label>
            <input 
              required
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5] border bg-white px-3 py-2"
              placeholder="Ex: Agence Principale Arconville"
            />
          </div>

          <div className="md:col-span-2 flex items-center">
            <input
              id="estSiege"
              name="estSiege"
              type="checkbox"
              checked={formData.estSiege}
              onChange={handleChange}
              className="h-4 w-4 text-[#0991b5] focus:ring-[#0991b5] border-gray-300 rounded border bg-white px-3 py-2"
            />
            <label htmlFor="estSiege" className="ml-2 block text-sm text-gray-900 font-medium">
              Cette agence est le siège social principal
            </label>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse complète *</label>
            <textarea 
              required
              name="adresse"
              rows={2}
              value={formData.adresse}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5] border bg-white px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coordonnées GPS (Optionnel)</label>
            <input 
              name="coordonneesGps"
              value={formData.coordonneesGps}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5] border bg-white px-3 py-2"
              placeholder="lat, lng (Ex: 6.366667, 2.433333)"
            />
            <p className="text-xs text-gray-500 mt-1">Nécessaire pour l'affichage sur la carte</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphones (Un par ligne) *</label>
            <textarea 
              required
              name="telephones"
              rows={3}
              value={formData.telephones}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5] border bg-white px-3 py-2"
              placeholder="+229 01 21 38 05 87"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Horaires d'ouverture *</label>
            <textarea 
              required
              name="horaires"
              rows={2}
              value={formData.horaires}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-[#0991b5] focus:border-[#0991b5] border bg-white px-3 py-2"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <Button type="button" variant="outline" className="mr-4" onClick={() => router.push('/sbf-gestion/agences')}>
            Annuler
          </Button>
          <Button type="submit" variant="accent" disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {isEditing ? 'Mettre à jour' : 'Enregistrer l\'agence'}
          </Button>
        </div>
      </form>
    </div>
  );
}
