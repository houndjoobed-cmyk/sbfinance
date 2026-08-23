'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Briefcase, CheckCircle2, Trash2, XCircle, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Candidature = {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  message: string | null;
  cvUrl: string;
  lettreUrl: string;
  estTraite: boolean;
  createdAt: string;
  offre: {
    titre: string;
  };
};

export default function CandidaturesPage() {
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidatures();
  }, []);

  const fetchCandidatures = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/candidatures');
      if (res.ok) setCandidatures(await res.json());
    } catch (error) {
      console.error('Erreur', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTraite = async (id: string, currentState: boolean) => {
    try {
      const res = await fetch(`/api/admin/candidatures/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estTraite: !currentState })
      });
      if (res.ok) {
        setCandidatures(prev => prev.map(c => c.id === id ? { ...c, estTraite: !currentState } : c));
      }
    } catch (error) {
      console.error('Erreur', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette candidature ?')) return;
    try {
      const res = await fetch(`/api/admin/candidatures/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCandidatures(prev => prev.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error('Erreur', error);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#0991b5]" /></div>;

  return (
    <div>
      <div className="flex items-center mb-8">
        <Briefcase className="w-8 h-8 mr-3 text-[#0991b5]" />
        <h1 className="text-3xl font-bold text-gray-900">Candidatures reçues</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidat</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poste</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {candidatures.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Aucune candidature reçue pour l'instant.</td></tr>
            ) : (
              candidatures.map((c) => (
                <tr key={c.id} className={`hover:bg-gray-50 ${c.estTraite ? 'opacity-60' : 'bg-blue-50/30'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{new Date(c.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                    <div className="mt-1">
                      {c.estTraite ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Traitée
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          En attente
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{c.prenom} {c.nom}</div>
                    <div className="text-sm text-gray-500">{c.telephone}</div>
                    <div className="text-sm text-gray-500">{c.email}</div>
                    {c.message && (
                      <div className="mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded max-h-24 overflow-y-auto">
                        <strong>Message:</strong><br />
                        {c.message}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-primary">{c.offre.titre}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-2">
                      <a href={c.cvUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-[#0991b5] hover:underline">
                        <FileText className="w-4 h-4 mr-1" /> Voir le CV <Download className="w-3 h-3 ml-1" />
                      </a>
                      <a href={c.lettreUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-[#0991b5] hover:underline">
                        <FileText className="w-4 h-4 mr-1" /> Voir la lettre <Download className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleTraite(c.id, c.estTraite)}
                        className={c.estTraite ? "text-gray-600" : "text-green-600 border-green-200 hover:bg-green-50"}
                      >
                        {c.estTraite ? <><XCircle className="w-4 h-4 mr-1" /> Marquer non lue</> : <><CheckCircle2 className="w-4 h-4 mr-1" /> Marquer traitée</>}
                      </Button>
                      <button onClick={() => handleDelete(c.id)} className="text-red-600 hover:bg-red-50 p-2 rounded-md">
                        <Trash2 className="w-4 h-4" />
                      </button>
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
