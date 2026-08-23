'use client';

import React, { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, UploadCloud, FileText, CheckCircle } from 'lucide-react';

interface CandidatureFormProps {
  offreId: string;
  offreTitre: string;
}

export function CandidatureForm({ offreId, offreTitre }: CandidatureFormProps) {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [lettreFile, setLettreFile] = useState<File | null>(null);
  
  const [cvError, setCvError] = useState('');
  const [lettreError, setLettreError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'cv' | 'lettre') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      if (type === 'cv') setCvError('Le fichier est trop volumineux (Max 5Mo)');
      if (type === 'lettre') setLettreError('Le fichier est trop volumineux (Max 5Mo)');
      return;
    }

    // Validate type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      if (type === 'cv') setCvError('Format non supporté (PDF, DOC, DOCX uniquement)');
      if (type === 'lettre') setLettreError('Format non supporté (PDF, DOC, DOCX uniquement)');
      return;
    }

    if (type === 'cv') {
      setCvFile(file);
      setCvError('');
    } else {
      setLettreFile(file);
      setLettreError('');
    }
  };

  const uploadFile = async (file: File, folder: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    
    const { error, data } = await supabase.storage
      .from('sbf-media')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('sbf-media')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!cvFile) {
      setCvError('Le CV est obligatoire');
      return;
    }
    if (!lettreFile) {
      setLettreError('La lettre de motivation est obligatoire');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Upload files
      const cvUrl = await uploadFile(cvFile, 'cvs');
      const lettreUrl = await uploadFile(lettreFile, 'lettres');

      // 2. Submit to API
      const response = await fetch('/api/candidatures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          offreId,
          offreTitre,
          cvUrl,
          lettreUrl,
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'envoi");

      setIsSuccess(true);
      setFormData({ nom: '', prenom: '', telephone: '', email: '', message: '' });
      setCvFile(null);
      setLettreFile(null);
      
    } catch (error) {
      console.error(error);
      setSubmitError('Une erreur est survenue. Veuillez réessayer plus tard.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-6 bg-green-50 rounded-lg border border-green-200">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h3 className="text-xl font-bold text-green-800 mb-2">Candidature envoyée !</h3>
        <p className="text-green-700 mb-6">
          Merci pour votre intérêt. Nous avons bien reçu votre dossier de candidature. Notre équipe RH l'examinera dans les plus brefs délais.
        </p>
        <Button onClick={() => setIsSuccess(false)} variant="outline">
          Soumettre une autre candidature
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {submitError && <div className="p-3 bg-red-50 text-red-600 rounded-md border border-red-200 text-sm">{submitError}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="nom">Nom <span className="text-red-500">*</span></Label>
          <Input id="nom" required value={formData.nom} onChange={handleInputChange} placeholder="Votre nom" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="prenom">Prénom <span className="text-red-500">*</span></Label>
          <Input id="prenom" required value={formData.prenom} onChange={handleInputChange} placeholder="Votre prénom" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="telephone">Téléphone <span className="text-red-500">*</span></Label>
          <Input id="telephone" type="tel" required value={formData.telephone} onChange={handleInputChange} placeholder="Ex: +229 01234567" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
          <Input id="email" type="email" required value={formData.email} onChange={handleInputChange} placeholder="votre.email@exemple.com" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>CV (PDF ou Word) <span className="text-red-500">*</span></Label>
        <div className="flex items-center justify-center w-full">
          <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${cvFile ? 'border-primary bg-primary/5' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {cvFile ? (
                <>
                  <FileText className="w-6 h-6 mb-2 text-primary" />
                  <p className="text-sm text-primary font-medium">{cvFile.name}</p>
                </>
              ) : (
                <>
                  <UploadCloud className="w-6 h-6 mb-2 text-gray-500" />
                  <p className="text-sm text-gray-500"><span className="font-semibold">Cliquez pour uploader</span> votre CV</p>
                </>
              )}
            </div>
            <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e, 'cv')} />
          </label>
        </div>
        {cvError && <p className="text-sm text-red-500">{cvError}</p>}
      </div>

      <div className="space-y-2">
        <Label>Lettre de motivation (PDF ou Word) <span className="text-red-500">*</span></Label>
        <div className="flex items-center justify-center w-full">
          <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${lettreFile ? 'border-primary bg-primary/5' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {lettreFile ? (
                <>
                  <FileText className="w-6 h-6 mb-2 text-primary" />
                  <p className="text-sm text-primary font-medium">{lettreFile.name}</p>
                </>
              ) : (
                <>
                  <UploadCloud className="w-6 h-6 mb-2 text-gray-500" />
                  <p className="text-sm text-gray-500"><span className="font-semibold">Cliquez pour uploader</span> votre LM</p>
                </>
              )}
            </div>
            <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e, 'lettre')} />
          </label>
        </div>
        {lettreError && <p className="text-sm text-red-500">{lettreError}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message (Optionnel)</Label>
        <Textarea id="message" value={formData.message} onChange={handleInputChange} placeholder="Quelques mots pour accompagner votre candidature..." className="min-h-25" />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary-dark py-6 text-lg rounded-full">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          "Envoyer ma candidature"
        )}
      </Button>
    </form>
  );
}
