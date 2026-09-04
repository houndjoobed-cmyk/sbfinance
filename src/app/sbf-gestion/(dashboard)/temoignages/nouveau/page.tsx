'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { ImageUpload } from '@/components/admin/image-upload';

export default function TemoignageFormPage({ params }: { params?: { id?: string } }) {
  const router = useRouter();
  const routeParams = useParams();
  const id = params?.id || (routeParams?.id as string | undefined);
  const isEditing = Boolean(id);
  
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    nom: '',
    role: '',
    texte: '',
    photo: '',
    estAffiche: true
  });

  useEffect(() => {
    if (isEditing && id) fetchTemoignage(id);
  }, [isEditing, id]);

  const fetchTemoignage = async (temoignageId: string) => {
    try {
      const res = await fetch(`/api/admin/temoignages/${temoignageId}`);
      if (res.ok) {
        const data = await res.json();
        setFormData({
          nom: data.nom || '',
          role: data.role || '',
          texte: data.texte || '',
          photo: data.photo || '',
          estAffiche: data.estAffiche
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

    const url = isEditing && id ? `/api/admin/temoignages/${id}` : '/api/admin/temoignages';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Erreur lors de la sauvegarde');

      router.push('/sbf-gestion/temoignages');
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

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#0991b5]" /></div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center mb-8">
        <Link href="/sbf-gestion/temoignages" className="text-gray-500 hover:text-gray-700 mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? 'Modifier le témoignage' : 'Nouveau témoignage'}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom du client *</label>
            <input required name="nom" value={formData.nom} onChange={handleChange} className="w-full border-gray-300 rounded-md focus:ring-[#0991b5] border bg-white px-3 py-2" placeholder="Ex: Jean DUPONT" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profession / Activité</label>
            <input name="role" value={formData.role} onChange={handleChange} className="w-full border-gray-300 rounded-md focus:ring-[#0991b5] border bg-white px-3 py-2" placeholder="Ex: Commerçant au marché Dantokpa" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Le témoignage *</label>
            <textarea required name="texte" rows={4} value={formData.texte} onChange={handleChange} className="w-full border-gray-300 rounded-md focus:ring-[#0991b5] border bg-white px-3 py-2" placeholder="Le message du client..." />
          </div>
          <div className="md:col-span-2">
            <ImageUpload 
              label="Photo (Optionnelle)"
              value={formData.photo}
              onChange={(url) => setFormData(prev => ({ ...prev, photo: url }))}
            />
          </div>
          <div className="md:col-span-2 flex items-center">
            <input
              id="estAffiche"
              name="estAffiche"
              type="checkbox"
              checked={formData.estAffiche}
              onChange={handleChange}
              className="h-4 w-4 text-[#0991b5] focus:ring-[#0991b5] border-gray-300 rounded border bg-white px-3 py-2"
            />
            <label htmlFor="estAffiche" className="ml-2 block text-sm text-gray-900 font-medium">
              Afficher ce témoignage publiquement sur le site
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <Button type="button" variant="outline" className="mr-4" onClick={() => router.push('/sbf-gestion/temoignages')}>Annuler</Button>
          <Button type="submit" variant="accent" disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {isEditing ? 'Mettre à jour' : 'Enregistrer'}
          </Button>
        </div>
      </form>
    </div>
  );
}
