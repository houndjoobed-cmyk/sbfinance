"use client";

import React, { useState, useEffect } from 'react';
import { 
  Palette, 
  Save, 
  RotateCcw, 
  Sparkles, 
  Sliders, 
  Check, 
  Eye, 
  Zap, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Lock,
  ExternalLink,
  RefreshCw,
  Info,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/admin/image-upload';

// Valeurs par défaut de la charte graphique officielle SBF
const DEFAULT_THEME = {
  primaryColor: '#01438F',
  primaryDark: '#00326e',
  accentColor: '#EB001B',
  accentHover: '#c80017',
  textColor: '#001a40',
  buttonRadius: '0px',
};

const DEFAULT_HERO_SETTINGS = {
  autoplayDelay: 6000,
  enableZoom: true,
  overlayOpacity: 20,
  textAnimation: 'typing' as 'typing' | 'fade' | 'slide',
  pauseOnHover: true,
};

// Palettes prédéfinies recommandées
const PRIMARY_PRESETS = [
  { name: 'Bleu Officiel SBF', color: '#01438F', dark: '#00326e' },
  { name: 'Bleu Nuit Profond', color: '#002855', dark: '#001938' },
  { name: 'Bleu Océan', color: '#0991b5', dark: '#076983' },
  { name: 'Vert Finance Durable', color: '#059669', dark: '#047857' },
  { name: 'Bleu Canard', color: '#0f766e', dark: '#115e59' },
  { name: 'Bleu Indigo', color: '#4338ca', dark: '#3730a3' },
];

const ACCENT_PRESETS = [
  { name: 'Rouge SBF', color: '#EB001B', hover: '#c80017' },
  { name: 'Orange Énergie', color: '#ea580c', hover: '#c2410c' },
  { name: 'Ambre Or', color: '#d97706', hover: '#b45309' },
  { name: 'Rose Framboise', color: '#e11d48', hover: '#be123c' },
  { name: 'Bleu Cyan Électrique', color: '#0284c7', hover: '#0369a1' },
];

const TEXT_PRESETS = [
  { name: 'Bleu Sombre SBF', color: '#001a40' },
  { name: 'Noir Anthracite', color: '#111827' },
  { name: 'Gris Foncé Pro', color: '#1f2937' },
  { name: 'Ardoise Marine', color: '#0f172a' },
];

const RADIUS_OPTIONS = [
  { id: '0px', label: 'Carré moderne', desc: '0px — Épuré & institutionnel' },
  { id: '6px', label: 'Coins adoucis', desc: '6px — Subtil & élégant' },
  { id: '12px', label: 'Arrondi moderne', desc: '12px — Convivial & doux' },
  { id: '9999px', label: 'Style Pilule', desc: 'Plein arrondi — Tendance & dynamique' },
];

export default function ApparencePage() {
  const [activeTab, setActiveTab] = useState<'colors' | 'hero' | 'favicon'>('colors');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [heroSettings, setHeroSettings] = useState(DEFAULT_HERO_SETTINGS);
  const [faviconUrl, setFaviconUrl] = useState<string>('/images/logos/LOGO_SB_F-navigateur.png');
  const [globalParams, setGlobalParams] = useState<any>({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/parametres');
      if (res.ok) {
        const data = await res.json();
        setGlobalParams(data);
        if (data.themeConfig) {
          if (data.themeConfig.theme) {
            setTheme({ ...DEFAULT_THEME, ...data.themeConfig.theme });
          }
          if (data.themeConfig.heroSettings) {
            setHeroSettings({ ...DEFAULT_HERO_SETTINGS, ...data.themeConfig.heroSettings });
          }
          if (data.themeConfig.faviconUrl) {
            setFaviconUrl(data.themeConfig.faviconUrl);
          }
        }
      }
    } catch (err) {
      console.error('Erreur chargement paramètres:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);

      const payload = {
        ...globalParams,
        themeConfig: {
          theme,
          heroSettings,
          faviconUrl,
        },
      };

      const res = await fetch('/api/admin/parametres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Échec de la sauvegarde');

      setMessage({
        text: 'Les modifications ont été enregistrées avec succès ! Elles sont actives sur le site public.',
        type: 'success',
      });
      setTimeout(() => setMessage(null), 6000);
    } catch (err: any) {
      setMessage({
        text: err.message || 'Erreur lors de la sauvegarde.',
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleResetToDefaults = () => {
    if (confirm('Voulez-vous rétablir toutes les couleurs, animations et le logo navigateur de la charte officielle SBF ?')) {
      setTheme(DEFAULT_THEME);
      setHeroSettings(DEFAULT_HERO_SETTINGS);
      setFaviconUrl('/images/logos/LOGO_SB_F-navigateur.png');
      setMessage({
        text: 'Valeurs par défaut rétablies. Cliquez sur « Enregistrer les modifications » pour confirmer.',
        type: 'success',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#111e36]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="p-2 bg-blue-50 text-primary rounded-lg">
              <Palette className="w-6 h-6" />
            </span>
            <h1 className="text-2xl font-bold text-[#111e36]">Apparence & Thème du Site Public</h1>
          </div>
          <p className="text-sm text-gray-500">
            Personnalisez les couleurs de votre marque, la forme des boutons et les animations du Hero pour le site public.
          </p>
        </div>

        <div className="flex items-center gap-3 self-stretch md:self-auto">
          <Button
            type="button"
            variant="outline"
            onClick={handleResetToDefaults}
            className="flex-1 md:flex-none border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Rétablir la charte SBF
          </Button>

          <Button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex-1 md:flex-none bg-primary hover:bg-[#002f66] text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </Button>
        </div>
      </div>

      {/* Notification */}
      {message && (
        <div
          className={`p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white px-4 pt-2 rounded-t-xl">
        <button
          type="button"
          onClick={() => setActiveTab('colors')}
          className={`pb-3 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'colors'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Palette className="w-4 h-4" />
          Couleurs & Boutons (Style Global)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hero')}
          className={`pb-3 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'hero'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Animations de la Section Hero (Accueil)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('favicon')}
          className={`pb-3 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'favicon'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Globe className="w-4 h-4" />
          Logo Navigateur (Favicon)
        </button>
      </div>

      {/* TAB 1: COULEURS & BOUTONS */}
      {activeTab === 'colors' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Colonne gauche : Paramètres */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Couleur Principale */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <h3 className="font-semibold text-[#111e36] text-base">Couleur Principale (Primary)</h3>
                  <p className="text-xs text-gray-500">
                    Utilisée pour le bandeau supérieur, les boutons principaux et les icônes majeures.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-gray-600 uppercase">{theme.primaryColor}</span>
                  <input
                    type="color"
                    value={theme.primaryColor}
                    onChange={(e) => {
                      const color = e.target.value;
                      setTheme((prev) => ({ ...prev, primaryColor: color, primaryDark: color }));
                    }}
                    className="w-10 h-10 p-0 border border-gray-300 rounded cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-gray-500 block mb-2">Suggestions & Nuances SBF :</span>
                <div className="flex flex-wrap gap-2">
                  {PRIMARY_PRESETS.map((p) => (
                    <button
                      key={p.color}
                      type="button"
                      onClick={() => setTheme((prev) => ({ ...prev, primaryColor: p.color, primaryDark: p.dark }))}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-medium transition-all ${
                        theme.primaryColor.toLowerCase() === p.color.toLowerCase()
                          ? 'border-primary bg-blue-50 text-primary ring-2 ring-primary/20'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: p.color }}></span>
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Couleur d'Accent (CTA) */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <h3 className="font-semibold text-[#111e36] text-base">Couleur d'Action (Accent / CTA)</h3>
                  <p className="text-xs text-gray-500">
                    Utilisée pour les boutons d'appel à l'action importants (« Découvrir nos crédits », badges).
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-gray-600 uppercase">{theme.accentColor}</span>
                  <input
                    type="color"
                    value={theme.accentColor}
                    onChange={(e) => {
                      const color = e.target.value;
                      setTheme((prev) => ({ ...prev, accentColor: color, accentHover: color }));
                    }}
                    className="w-10 h-10 p-0 border border-gray-300 rounded cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-gray-500 block mb-2">Suggestions d'accent :</span>
                <div className="flex flex-wrap gap-2">
                  {ACCENT_PRESETS.map((p) => (
                    <button
                      key={p.color}
                      type="button"
                      onClick={() => setTheme((prev) => ({ ...prev, accentColor: p.color, accentHover: p.hover }))}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-medium transition-all ${
                        theme.accentColor.toLowerCase() === p.color.toLowerCase()
                          ? 'border-red-500 bg-red-50 text-red-700 ring-2 ring-red-500/20'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: p.color }}></span>
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Couleur du Texte */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <h3 className="font-semibold text-[#111e36] text-base">Couleur des Titres & Textes</h3>
                  <p className="text-xs text-gray-500">
                    Appliquée sur les grands titres de sections et paragraphes du site.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-gray-600 uppercase">{theme.textColor}</span>
                  <input
                    type="color"
                    value={theme.textColor}
                    onChange={(e) => setTheme((prev) => ({ ...prev, textColor: e.target.value }))}
                    className="w-10 h-10 p-0 border border-gray-300 rounded cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-gray-500 block mb-2">Nuances recommandées :</span>
                <div className="flex flex-wrap gap-2">
                  {TEXT_PRESETS.map((p) => (
                    <button
                      key={p.color}
                      type="button"
                      onClick={() => setTheme((prev) => ({ ...prev, textColor: p.color }))}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-medium transition-all ${
                        theme.textColor.toLowerCase() === p.color.toLowerCase()
                          ? 'border-gray-900 bg-gray-100 text-gray-900 ring-2 ring-gray-900/20'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border" style={{ backgroundColor: p.color }}></span>
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Forme des Boutons */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div>
                <h3 className="font-semibold text-[#111e36] text-base">Style & Arrondi des Boutons</h3>
                <p className="text-xs text-gray-500">
                  Détermine le niveau d'arrondi sur tous les boutons du site public.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RADIUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTheme((prev) => ({ ...prev, buttonRadius: opt.id }))}
                    className={`p-3.5 border rounded-lg text-left transition-all flex items-center justify-between ${
                      theme.buttonRadius === opt.id
                        ? 'border-primary bg-blue-50/70 ring-2 ring-primary/20'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-sm text-gray-900">{opt.label}</div>
                      <div className="text-xs text-gray-500">{opt.desc}</div>
                    </div>
                    <div
                      className="w-8 h-6 border-2 border-gray-400 bg-white"
                      style={{ borderRadius: opt.id }}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite : LIVE PREVIEW */}
          <div className="lg:col-span-5">
            <div className="sticky top-6 space-y-4">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-[#111e36] text-sm uppercase tracking-wide">Aperçu en Direct</h3>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                    Simulateur
                  </span>
                </div>

                {/* Cadre de simulation */}
                <div className="p-6 rounded-xl bg-gray-50 border border-dashed border-gray-300 space-y-5">
                  <div>
                    <span
                      className="inline-block text-xs font-semibold px-2.5 py-1 text-white mb-2"
                      style={{
                        backgroundColor: theme.accentColor,
                        borderRadius: theme.buttonRadius,
                      }}
                    >
                      NOUVEAUTÉ 2026
                    </span>
                    <h4
                      className="text-2xl font-bold leading-tight transition-colors"
                      style={{ color: theme.textColor }}
                    >
                      Cultivons la prospérité ensemble
                    </h4>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                      Des solutions de microfinance souples et durables pour dynamiser vos activités au Bénin.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-medium text-gray-500">Exemples de boutons avec vos styles :</div>
                    <div className="flex flex-wrap gap-2.5">
                      {/* Bouton Primaire */}
                      <button
                        type="button"
                        className="px-4 py-2 text-xs font-semibold text-white shadow-sm transition-transform active:scale-95 flex items-center gap-1.5"
                        style={{
                          backgroundColor: theme.primaryColor,
                          borderRadius: theme.buttonRadius,
                        }}
                      >
                        Bouton Primaire
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      {/* Bouton Accent */}
                      <button
                        type="button"
                        className="px-4 py-2 text-xs font-semibold text-white shadow-sm transition-transform active:scale-95"
                        style={{
                          backgroundColor: theme.accentColor,
                          borderRadius: theme.buttonRadius,
                        }}
                      >
                        Action (CTA)
                      </button>

                      {/* Bouton Outline */}
                      <button
                        type="button"
                        className="px-4 py-2 text-xs font-semibold border transition-all"
                        style={{
                          borderColor: theme.primaryColor,
                          color: theme.primaryColor,
                          borderRadius: theme.buttonRadius,
                        }}
                      >
                        En savoir plus
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-900 leading-relaxed flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    Ces couleurs s'injectent directement dans les variables CSS Tailwind du site public. Le dashboard admin conserve quant à lui son style neutre.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ANIMATIONS DU HERO */}
      {activeTab === 'hero' && (
        <div className="max-w-4xl space-y-6">
          {/* 1. Vitesse de rotation */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-[#111e36] text-base">Vitesse de Défilement Automatique</h3>
                <p className="text-xs text-gray-500">
                  Délai d'affichage de chaque diapositive avant le passage automatique à la suivante.
                </p>
              </div>
              <span className="text-base font-bold text-primary bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                {(heroSettings.autoplayDelay / 1000).toFixed(1)} secondes
              </span>
            </div>

            <div className="space-y-2 pt-2">
              <input
                type="range"
                min={2000}
                max={12000}
                step={500}
                value={heroSettings.autoplayDelay}
                onChange={(e) =>
                  setHeroSettings((prev) => ({ ...prev, autoplayDelay: parseInt(e.target.value) }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Rapide (2s)</span>
                <span>Recommandé (5s - 6s)</span>
                <span>Lent (12s)</span>
              </div>
            </div>
          </div>

          {/* 2. Effet de Zoom Ken-Burns */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-[#111e36] text-base">Effet de Zoom Progressif (Ken-Burns)</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Anime doucement l'image d'arrière-plan en l'agrandissant lentement pendant la rotation.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={heroSettings.enableZoom}
                onChange={(e) =>
                  setHeroSettings((prev) => ({ ...prev, enableZoom: e.target.checked }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {/* 3. Style d'Animation du Titre */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div>
              <h3 className="font-semibold text-[#111e36] text-base">Animation du Titre Principal</h3>
              <p className="text-xs text-gray-500">
                Choisissez comment le slogan ou le titre apparaît à chaque changement de bannière.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {/* Option 1: Typing */}
              <button
                type="button"
                onClick={() => setHeroSettings((prev) => ({ ...prev, textAnimation: 'typing' }))}
                className={`p-4 border rounded-xl text-left transition-all ${
                  heroSettings.textAnimation === 'typing'
                    ? 'border-primary bg-blue-50/70 ring-2 ring-primary/20'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-[#111e36]">
                  <Zap className="w-4 h-4 text-primary" />
                  Machine à écrire
                </div>
                <p className="text-xs text-gray-500">
                  Les lettres s'écrivent l'une après l'autre de manière vivante et moderne.
                </p>
              </button>

              {/* Option 2: Fade */}
              <button
                type="button"
                onClick={() => setHeroSettings((prev) => ({ ...prev, textAnimation: 'fade' }))}
                className={`p-4 border rounded-xl text-left transition-all ${
                  heroSettings.textAnimation === 'fade'
                    ? 'border-primary bg-blue-50/70 ring-2 ring-primary/20'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-[#111e36]">
                  <Layers className="w-4 h-4 text-primary" />
                  Fondu progressif
                </div>
                <p className="text-xs text-gray-500">
                  Apparition en douceur avec un fondu transparent très élégant.
                </p>
              </button>

              {/* Option 3: Slide */}
              <button
                type="button"
                onClick={() => setHeroSettings((prev) => ({ ...prev, textAnimation: 'slide' }))}
                className={`p-4 border rounded-xl text-left transition-all ${
                  heroSettings.textAnimation === 'slide'
                    ? 'border-primary bg-blue-50/70 ring-2 ring-primary/20'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-[#111e36]">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  Glissement montant
                </div>
                <p className="text-xs text-gray-500">
                  Le texte glisse délicatement du bas vers le haut.
                </p>
              </button>
            </div>
          </div>

          {/* 4. Intensité du Voile Sombre (Overlay) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-[#111e36] text-base">Filtre Sombre sur l'Image (Overlay)</h3>
                <p className="text-xs text-gray-500">
                  Assombrit les photos du Hero pour rendre le texte blanc parfaitement net et contrasté.
                </p>
              </div>
              <span className="text-base font-bold text-primary bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                {heroSettings.overlayOpacity}%
              </span>
            </div>

            <div className="space-y-2 pt-2">
              <input
                type="range"
                min={0}
                max={75}
                step={5}
                value={heroSettings.overlayOpacity}
                onChange={(e) =>
                  setHeroSettings((prev) => ({ ...prev, overlayOpacity: parseInt(e.target.value) }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Transparent (0%)</span>
                <span>Équilibré (20% - 30%)</span>
                <span>Foncé (75%)</span>
              </div>
            </div>
          </div>

          {/* 5. Pause au survol de la souris */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-[#111e36] text-base">Pause au Survol de la Souris</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Stoppe le défilement automatique lorsque l'utilisateur survole le Hero avec sa souris pour lui laisser le temps de lire.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={heroSettings.pauseOnHover}
                onChange={(e) =>
                  setHeroSettings((prev) => ({ ...prev, pauseOnHover: e.target.checked }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      )}

      {/* TAB 3: LOGO DU NAVIGATEUR (FAVICON) */}
      {activeTab === 'favicon' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Colonne gauche : Paramètres et Téléversement */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Téléversement du Favicon */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
              <div className="flex justify-between items-start border-b pb-3">
                <div>
                  <h3 className="font-semibold text-[#111e36] text-base flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#0991b5]" />
                    Logo / Favicon dans le Navigateur
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Cette icône s'affiche dans l'onglet du navigateur de vos visiteurs, dans leurs favoris et dans les résultats de recherche Google devant <strong>sbfinance.bj</strong>.
                  </p>
                </div>
              </div>

              <div>
                <ImageUpload
                  label="Téléverser un nouveau logo favicon (PNG, WebP, ICO, SVG)"
                  value={faviconUrl}
                  onChange={(url) => setFaviconUrl(url || '/images/logos/LOGO_SB_F-navigateur.png')}
                />
              </div>

              {/* Champ d'URL directe */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Ou renseigner directement le chemin ou l'URL de l'image :
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={faviconUrl}
                    onChange={(e) => setFaviconUrl(e.target.value)}
                    className="flex-1 text-sm border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 focus:ring-primary focus:border-primary"
                    placeholder="/images/logos/LOGO_SB_F-navigateur.png"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFaviconUrl('/images/logos/LOGO_SB_F-navigateur.png')}
                    title="Rétablir l'icône officielle"
                    className="shrink-0 text-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1" />
                    Par défaut
                  </Button>
                </div>
              </div>
            </div>

            {/* 2. Présélections officielles SBF */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-semibold text-[#111e36] text-base">Présélections officielles SBF</h3>
              <p className="text-xs text-gray-500">
                Vous pouvez activer en 1 clic l'une des déclinaisons d'icônes préparées pour la charte Salem Braha Finance :
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {[
                  {
                    name: 'Logo Navigateur SBF',
                    url: '/images/logos/LOGO_SB_F-navigateur.png',
                    desc: 'Optimisé onglet web',
                  },
                  {
                    name: 'Emblème Carré HD',
                    url: '/icon.png',
                    desc: '512×512 px Haute Définition',
                  },
                  {
                    name: 'Logo Complet SBF',
                    url: '/images/logos/logo-sbf.png',
                    desc: 'Version horizontale',
                  },
                ].map((preset) => (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => setFaviconUrl(preset.url)}
                    className={`p-3.5 border transition-all rounded-lg flex flex-col items-center text-center group ${
                      faviconUrl === preset.url
                        ? 'border-primary ring-2 ring-primary/20 bg-blue-50/50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-14 h-14 bg-white border border-gray-100 rounded-lg p-2 shadow-xs mb-2 flex items-center justify-center">
                      <img src={preset.url} alt={preset.name} className="max-w-full max-h-full object-contain" />
                    </div>
                    <span className="font-medium text-xs text-gray-900 group-hover:text-primary transition-colors">
                      {preset.name}
                    </span>
                    <span className="text-[10px] text-gray-500 mt-0.5">{preset.desc}</span>
                    {faviconUrl === preset.url && (
                      <span className="mt-2 inline-flex items-center text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3 mr-0.5" /> Actif
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Guide & Bonnes Pratiques Google */}
            <div className="bg-blue-50/70 border border-blue-200/80 p-5 rounded-xl text-xs space-y-2 text-blue-900">
              <div className="flex items-center gap-2 font-bold text-sm text-primary">
                <Info className="w-4 h-4 shrink-0" />
                Recommandations Google Search & Navigateurs
              </div>
              <ul className="list-disc list-inside space-y-1.5 text-blue-800/90 pl-1 leading-relaxed">
                <li><strong>Ratio carré 1:1 :</strong> Préférez une image parfaitement carrée (ex: 512×512 px ou multiple de 48 px : 48×48, 96×96).</li>
                <li><strong>Fond transparent :</strong> Permet un affichage impeccable que l'utilisateur soit en mode sombre ou clair.</li>
                <li><strong>Prise en compte :</strong> Une fois sauvegardée, la modification est immédiate dans les onglets du site. Google met quelques jours à rafraîchir son cache de favicons pour les résultats de recherche.</li>
              </ul>
            </div>
          </div>

          {/* Colonne droite : Aperçus en direct */}
          <div className="lg:col-span-5 space-y-6">
            {/* Aperçu 1 : Onglet de navigateur */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-semibold text-[#111e36] text-base flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  Aperçu dans l'onglet navigateur
                </h3>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  Simulation en direct
                </span>
              </div>

              {/* Faux navigateur Chrome / Edge */}
              <div className="bg-slate-200 rounded-xl overflow-hidden shadow-md border border-slate-300">
                {/* Barre d'onglets */}
                <div className="bg-slate-200 px-3 pt-2.5 pb-0 flex items-center gap-2">
                  {/* Boutons fenêtre */}
                  <div className="flex items-center gap-1.5 mr-2">
                    <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
                  </div>

                  {/* Onglet actif */}
                  <div className="bg-white text-slate-800 px-3 py-2 rounded-t-lg text-xs flex items-center gap-2 max-w-65 shadow-xs border-t border-l border-r border-slate-300">
                    <img
                      src={faviconUrl}
                      alt="Favicon preview"
                      className="w-4 h-4 object-contain shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/logos/LOGO_SB_F-navigateur.png';
                      }}
                    />
                    <span className="truncate font-medium text-[11px]">Salem Braha Finance - Cultivons la prospérité</span>
                    <span className="text-slate-400 hover:text-slate-600 ml-auto cursor-pointer font-bold text-[10px]">✕</span>
                  </div>

                  {/* Faux second onglet */}
                  <div className="hidden sm:flex items-center gap-1 text-slate-500 px-3 py-1 text-xs opacity-60">
                    <span className="w-3 h-3 rounded-full bg-slate-400/50"></span>
                    <span className="truncate text-[10px]">Autre onglet</span>
                  </div>
                </div>

                {/* Barre d'URL */}
                <div className="bg-white px-3 py-2 border-t border-slate-200 flex items-center gap-2">
                  <div className="flex-1 bg-slate-100 rounded-full px-3 py-1 flex items-center gap-2 text-xs text-slate-600 border border-slate-200">
                    <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="text-slate-900 font-medium">https://</span>
                    <span className="text-slate-900 font-semibold">sbfinance.bj</span>
                  </div>
                </div>

                {/* Mini page */}
                <div className="bg-slate-50 p-6 flex items-center justify-center border-t border-slate-200">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-xs border border-gray-200 flex items-center justify-center p-2 mx-auto mb-2">
                      <img
                        src={faviconUrl}
                        alt="Logo"
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/logos/LOGO_SB_F-navigateur.png';
                        }}
                      />
                    </div>
                    <p className="text-xs font-bold text-slate-800">Salem Braha Finance</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Icône active dans la barre de titre</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Aperçu 2 : Résultat Google Search */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-semibold text-[#111e36] text-base flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#0991b5]" />
                  Aperçu dans les résultats Google
                </h3>
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                  Google Search
                </span>
              </div>

              {/* Simulation Google Snippet */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-2">
                {/* Ligne URL + Favicon */}
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                    <img
                      src={faviconUrl}
                      alt="Google Favicon"
                      className="w-4 h-4 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/logos/LOGO_SB_F-navigateur.png';
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-800 leading-tight">sbfinance.bj</span>
                    <span className="text-[11px] text-gray-500 leading-tight">https://sbfinance.bj</span>
                  </div>
                </div>

                {/* Titre cliquable bleu */}
                <h4 className="text-base font-semibold text-[#1a0dab] hover:underline cursor-pointer leading-snug">
                  Salem Braha Finance - Cultivons la prospérité
                </h4>

                {/* Description */}
                <p className="text-xs text-[#4d5156] leading-relaxed">
                  Institution de microfinance au Bénin. Nous contribuons à l'amélioration des conditions de vie via des services financiers adaptés.
                </p>
              </div>

              <p className="text-[11px] text-gray-400 italic">
                * Dès le prochain passage du robot Googlebot, le logo ci-dessus remplacera l'icône de globe gris.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
