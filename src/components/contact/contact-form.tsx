"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { submitContactForm } from '@/app/contacts/actions';
import { CheckCircle2, AlertCircle, User, Phone as PhoneIcon, Mail, Building, ChevronDown, Send } from 'lucide-react';

interface ContactFormProps {
  agencies: { id: string; nom: string }[];
}

export function ContactForm({ agencies }: ContactFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setStatus('idle');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);

    if (result.success) {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'Une erreur est survenue.');
    }
    
    setIsPending(false);
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 text-green-800 p-8 rounded-none border border-green-200 text-center shadow-sm">
        <div className="w-20 h-20 bg-green-100 rounded-none flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold mb-3 text-green-900">Message envoyé avec succès !</h3>
        <p className="text-green-700 mb-8">Nous avons bien reçu votre demande et nous vous contacterons dans les plus brefs délais.</p>
        <Button variant="outline" className="rounded-none border-green-300 text-green-700 hover:bg-green-100 hover:text-green-800" onClick={() => setStatus('idle')}>
          Envoyer un autre message
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-10 rounded-none shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-outline-variant/20 relative overflow-hidden">
      {/* Decorative subtle gradient background */}
      <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-primary via-accent to-primary"></div>
      
      {status === 'error' && (
        <div className="bg-red-50 rounded-none p-4 flex items-center mb-8 border border-red-100">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <p className="ml-3 text-sm text-red-800 font-medium">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold text-primary-dark">Nom et Prénom <span className="text-accent">*</span></label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant/50">
              <User className="h-5 w-5" />
            </div>
            <input 
              type="text" 
              id="name" 
              name="name"
              className="w-full h-14 pl-12 pr-4 rounded-none border border-outline-variant/60 bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface" 
              placeholder="Votre nom complet"
              required
              disabled={isPending}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-semibold text-primary-dark">Numéro de téléphone <span className="text-accent">*</span></label>
          <div className="relative flex">
            <div className="flex items-center justify-center h-14 px-4 bg-surface-muted border border-outline-variant/60 border-r-0 rounded-none text-on-surface-variant font-medium">
              <span className="mr-2">🇧🇯</span> (+229)
            </div>
            <div className="relative grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant/50">
                <PhoneIcon className="h-5 w-5" />
              </div>
              <input 
                type="tel" 
                id="phone" 
                name="phone"
                className="w-full h-14 pl-12 pr-4 rounded-none border border-outline-variant/60 bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface" 
                placeholder="XX XX XX XX XX"
                required
                disabled={isPending}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-primary-dark">Email (optionnel)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant/50">
              <Mail className="h-5 w-5" />
            </div>
            <input 
              type="email" 
              id="email" 
              name="email"
              className="w-full h-14 pl-12 pr-4 rounded-none border border-outline-variant/60 bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface" 
              placeholder="Entrez votre adresse email"
              disabled={isPending}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="objet" className="text-sm font-semibold text-primary-dark">Objet du message <span className="text-accent">*</span></label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant/50">
              <Mail className="h-5 w-5" />
            </div>
            <select 
              id="objet" 
              name="objet"
              className="w-full h-14 pl-12 pr-10 rounded-none border border-outline-variant/60 bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none text-on-surface"
              required
              disabled={isPending}
            >
              <option value="">Sélectionnez un objet...</option>
              <option value="Demande de crédit">Demande de crédit</option>
              <option value="Ouverture de compte / Épargne">Ouverture de compte / Épargne</option>
              <option value="Informations sur les offres">Informations sur les offres</option>
              <option value="Partenariat">Partenariat</option>
              <option value="Réclamation">Réclamation</option>
              <option value="Autre">Autre</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-on-surface-variant/50">
              <ChevronDown className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="agency" className="text-sm font-semibold text-primary-dark">Agence de préférence (optionnel)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant/50">
              <Building className="h-5 w-5" />
            </div>
            <select 
              id="agency" 
              name="agency"
              className="w-full h-14 pl-12 pr-10 rounded-none border border-outline-variant/60 bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none text-on-surface"
              disabled={isPending}
            >
              <option value="">Sélectionnez une agence...</option>
              {agencies.map((agency) => (
                <option key={agency.id} value={agency.id}>
                  {agency.nom}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-on-surface-variant/50">
              <ChevronDown className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-semibold text-primary-dark">Message <span className="text-accent">*</span></label>
          <textarea 
            id="message" 
            name="message"
            rows={5}
            className="w-full p-4 rounded-none border border-outline-variant/60 bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-on-surface" 
            placeholder="Écrivez votre message ici..."
            required
            disabled={isPending}
          ></textarea>
        </div>

        <Button 
          type="submit" 
          className="w-full h-14 rounded-none bg-accent hover:bg-accent-hover text-white font-bold text-lg shadow-[0_4px_14px_0_rgba(229,57,53,0.39)] hover:shadow-[0_6px_20px_rgba(229,57,53,0.23)] transition-all duration-200 mt-4 flex items-center justify-center gap-2" 
          disabled={isPending}
        >
          {isPending ? "Envoi en cours..." : "Envoyer le message"}
          {!isPending && <Send className="w-5 h-5 ml-1" />}
        </Button>
      </form>
    </div>
  );
}
