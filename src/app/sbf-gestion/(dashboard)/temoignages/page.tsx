'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Loader2, Eye, EyeOff, MessageSquareQuote } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Temoignage = {
  id: string;
  nom: string;
  role: string | null;
  texte: string;
  estAffiche: boolean;
  createdAt: string;
};

export default function TemoignagesPage() {
  const [temoignages, setTemoignages] = useState<Temoignage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemoignages();
  }, []);

  const fetchTemoignages = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/temoignages');
      if (res.ok) {
        setTemoignages(await res.json());
      }
    } catch (error) {
      console.error('Erreur', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce témoignage ?')) return;
    try {
      const res = await fetch(`/api/admin/temoignages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTemoignages(prev => prev.filter(t => t.id !== id));
      }
    } catch (error) {
      console.error('Erreur', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#0991b5]" /></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <MessageSquareQuote className="w-8 h-8 mr-3 text-[#0991b5]" />
          Témoignages Clients
        </h1>
        <Button asChild variant="accent">
          <Link href="/sbf-gestion/temoignages/nouveau">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Témoignage
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {temoignages.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">Aucun témoignage enregistré.</td></tr>
            ) : (
              temoignages.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{t.nom}</div>
                    <div className="text-sm text-gray-500">{t.role || 'Non spécifié'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 line-clamp-3">{t.texte}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {t.estAffiche ? (
                      <span className="flex items-center text-sm text-green-600"><Eye className="w-4 h-4 mr-1" /> Affiché</span>
                    ) : (
                      <span className="flex items-center text-sm text-gray-500"><EyeOff className="w-4 h-4 mr-1" /> Masqué</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link href={`/sbf-gestion/temoignages/${t.id}`} className="text-[#0991b5] hover:bg-blue-50 p-2 rounded-md"><Edit className="w-4 h-4" /></Link>
                      <button onClick={() => handleDelete(t.id)} className="text-red-600 hover:bg-red-50 p-2 rounded-md"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
