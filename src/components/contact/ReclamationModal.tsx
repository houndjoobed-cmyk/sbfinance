'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { submitReclamationForm } from '@/app/contacts/actions';

export function ReclamationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    const formData = new FormData(e.currentTarget);
    const result = await submitReclamationForm(formData);
    
    setIsSubmitting(false);

    if (result.success) {
      setSubmitStatus('success');
      
      // Auto close after 3 seconds on success
      setTimeout(() => {
        setIsOpen(false);
        setSubmitStatus('idle');
      }, 3000);
    } else {
      setSubmitStatus('error');
      setErrorMessage(result.error || 'Une erreur est survenue.');
    }
  };

  const modalContent = isOpen && mounted ? (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-red-600 p-4 flex justify-between items-center shrink-0">
          <h3 className="text-xl font-bold text-white">Formulaire de réclamation</h3>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-red-200 transition-colors"
            aria-label="Fermer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
              <h4 className="text-xl font-bold text-primary-dark mb-2">Réclamation envoyée</h4>
              <p className="text-on-surface-variant">Nous avons bien reçu votre réclamation et la traiterons dans les plus brefs délais.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="objet">Objet *</Label>
                <Input id="objet" name="objet" required placeholder="Sujet de votre réclamation" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nom_prenom">Nom et Prénom *</Label>
                <Input id="nom_prenom" name="nom_prenom" required placeholder="Votre nom complet" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact (Téléphone) *</Label>
                  <Input id="contact" name="contact" type="tel" required placeholder="+229..." />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="votre@email.com (Optionnel)" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="revendication">Revendication *</Label>
                <Textarea 
                  id="revendication" 
                  name="revendication" 
                  required 
                  placeholder="Décrivez votre revendication ici..." 
                  className="min-h-[120px]"
                />
              </div>
              
              {submitStatus === 'error' && (
                <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
                  {errorMessage || "Une erreur est survenue lors de l'envoi. Veuillez réessayer."}
                </div>
              )}
              
              <div className="pt-2 flex justify-end gap-3 mt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsOpen(false)}
                  disabled={isSubmitting}
                >
                  Annuler
                </Button>
                <Button 
                  type="submit" 
                  className="bg-red-600 hover:bg-red-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Envoi...' : 'Envoyer'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 mt-4"
      >
        Réclamation
      </Button>

      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}

