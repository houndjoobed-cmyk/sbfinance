'use client';

import React, { useState, useCallback, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ImageWithLayout, type ImageLayout } from './image-layout-extension';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { supabase } from '@/lib/supabase';
import imageCompression from 'browser-image-compression';
import { ImageBubbleMenu } from './image-bubble-menu';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Quote,
  Code,
  Minus,
  ImagePlus,
  Link as LinkIcon,
  Undo2,
  Redo2,
  Highlighter,
  Loader2,
  Upload,
  X,
} from 'lucide-react';

import './rich-editor.css';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

/**
 * Éditeur de texte riche (WYSIWYG) complet
 * semblable à Word/Google Docs pour la rédaction d'articles.
 */
export function RichTextEditor({
  content,
  onChange,
  placeholder = 'Commencez à rédiger votre article ici...',
}: RichTextEditorProps) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [insertLayout, setInsertLayout] = useState<ImageLayout>('center');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      ImageWithLayout.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Highlight.configure({
        multicolor: false,
      }),
      TextStyle,
      Color,
    ],
    content,
    onUpdate: ({ editor: e }) => {
      onChange(e.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose-editor',
      },
    },
  });

  /** Upload une image vers Supabase et retourne l'URL publique. */
  const uploadImage = useCallback(
    async (file: File): Promise<string | null> => {
      setUploading(true);
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: 'image/webp' as const,
        };

        let compressed: File;
        try {
          compressed = await imageCompression(file, options);
        } catch {
          compressed = file;
        }

        const ext =
          compressed.type === 'image/webp'
            ? 'webp'
            : file.name.split('.').pop();
        const name = `article_${Math.random()
          .toString(36)
          .substring(2, 12)}_${Date.now()}.${ext}`;

        const { error } = await supabase.storage
          .from('sbf-media')
          .upload(name, compressed, {
            cacheControl: '3600',
            upsert: false,
          });

        if (error) throw error;

        const {
          data: { publicUrl },
        } = supabase.storage.from('sbf-media').getPublicUrl(name);

        return publicUrl;
      } catch (err) {
        console.error('Erreur upload image:', err);
        return null;
      } finally {
        setUploading(false);
      }
    },
    [],
  );

  /** Insère une image dans l'éditeur (par URL ou upload). */
  const insertImage = useCallback(
    (url: string, layout?: ImageLayout) => {
      if (!editor || !url) return;
      editor
        .chain()
        .focus()
        .setImage({ src: url, layout: layout || insertLayout } as any)
        .run();
      setShowImageModal(false);
      setImageUrl('');
      setInsertLayout('center');
    },
    [editor, insertLayout],
  );

  /** Gère le choix d'un fichier image depuis le sélecteur de fichier. */
  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const url = await uploadImage(file);
      if (url) insertImage(url);
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = '';
    },
    [uploadImage, insertImage],
  );

  /** Ajoute ou supprime un lien hypertexte. */
  const handleLink = useCallback(() => {
    if (!editor) return;
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    setShowLinkModal(true);
    const prev = editor.getAttributes('link').href;
    setLinkUrl(prev || '');
  }, [editor]);

  const confirmLink = useCallback(() => {
    if (!editor) return;
    if (linkUrl === '') {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: linkUrl }).run();
    }
    setShowLinkModal(false);
    setLinkUrl('');
  }, [editor, linkUrl]);

  /** Gère le changement du type de bloc (heading / paragraph). */
  const handleBlockType = useCallback(
    (value: string) => {
      if (!editor) return;
      if (value === 'paragraph') {
        editor.chain().focus().setParagraph().run();
      } else {
        const level = parseInt(value.replace('h', ''), 10) as 1 | 2 | 3 | 4;
        editor.chain().focus().toggleHeading({ level }).run();
      }
    },
    [editor],
  );

  /** Retourne la valeur active actuelle du sélecteur de blocs. */
  const getCurrentBlockType = (): string => {
    if (!editor) return 'paragraph';
    if (editor.isActive('heading', { level: 1 })) return 'h1';
    if (editor.isActive('heading', { level: 2 })) return 'h2';
    if (editor.isActive('heading', { level: 3 })) return 'h3';
    if (editor.isActive('heading', { level: 4 })) return 'h4';
    return 'paragraph';
  };

  /** Calcule le nombre de mots dans l'éditeur. */
  const getWordCount = (): number => {
    if (!editor) return 0;
    const text = editor.state.doc.textContent;
    return text
      .split(/\s+/)
      .filter((w) => w.length > 0).length;
  };

  /** Calcule le nombre de caractères. */
  const getCharCount = (): number => {
    if (!editor) return 0;
    return editor.state.doc.textContent.length;
  };

  if (!editor) {
    return (
      <div className="flex items-center justify-center h-64 border border-gray-200 rounded-lg bg-gray-50">
        <Loader2 className="w-6 h-6 animate-spin text-[#0991b5]" />
      </div>
    );
  }

  return (
    <div className="rich-editor-wrapper">
      {/* ===== TOOLBAR ===== */}
      <div className="editor-toolbar">
        {/* Sélecteur de type de bloc */}
        <div className="toolbar-group">
          <select
            className="heading-select"
            value={getCurrentBlockType()}
            onChange={(e) => handleBlockType(e.target.value)}
            title="Type de bloc"
          >
            <option value="paragraph">Paragraphe</option>
            <option value="h1">Titre 1</option>
            <option value="h2">Titre 2</option>
            <option value="h3">Titre 3</option>
            <option value="h4">Titre 4</option>
          </select>
        </div>

        <div className="toolbar-divider" />

        {/* Formatage de texte */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`toolbar-btn ${editor.isActive('bold') ? 'is-active' : ''}`}
            title="Gras (Ctrl+B)"
          >
            <Bold />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`toolbar-btn ${editor.isActive('italic') ? 'is-active' : ''}`}
            title="Italique (Ctrl+I)"
          >
            <Italic />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`toolbar-btn ${editor.isActive('underline') ? 'is-active' : ''}`}
            title="Souligné (Ctrl+U)"
          >
            <UnderlineIcon />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`toolbar-btn ${editor.isActive('strike') ? 'is-active' : ''}`}
            title="Barré"
          >
            <Strikethrough />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={`toolbar-btn ${editor.isActive('highlight') ? 'is-active' : ''}`}
            title="Surligner"
          >
            <Highlighter />
          </button>
        </div>

        <div className="toolbar-divider" />

        {/* Alignement */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`toolbar-btn ${editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}`}
            title="Aligner à gauche"
          >
            <AlignLeft />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`toolbar-btn ${editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}`}
            title="Centrer"
          >
            <AlignCenter />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`toolbar-btn ${editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}`}
            title="Aligner à droite"
          >
            <AlignRight />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`toolbar-btn ${editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}`}
            title="Justifier"
          >
            <AlignJustify />
          </button>
        </div>

        <div className="toolbar-divider" />

        {/* Listes */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`toolbar-btn ${editor.isActive('bulletList') ? 'is-active' : ''}`}
            title="Liste à puces"
          >
            <List />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`toolbar-btn ${editor.isActive('orderedList') ? 'is-active' : ''}`}
            title="Liste numérotée"
          >
            <ListOrdered />
          </button>
        </div>

        <div className="toolbar-divider" />

        {/* Blocs spéciaux */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`toolbar-btn ${editor.isActive('blockquote') ? 'is-active' : ''}`}
            title="Citation"
          >
            <Quote />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`toolbar-btn ${editor.isActive('codeBlock') ? 'is-active' : ''}`}
            title="Bloc de code"
          >
            <Code />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="toolbar-btn"
            title="Ligne horizontale"
          >
            <Minus />
          </button>
        </div>

        <div className="toolbar-divider" />

        {/* Lien */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={handleLink}
            className={`toolbar-btn ${editor.isActive('link') ? 'is-active' : ''}`}
            title="Insérer / Modifier un lien"
          >
            <LinkIcon />
          </button>
        </div>

        <div className="toolbar-divider" />

        {/* Insérer image */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => setShowImageModal(true)}
            className="toolbar-btn toolbar-btn-image"
            title="Insérer une image"
          >
            <ImagePlus />
            <span className="hidden sm:inline">Image</span>
          </button>
        </div>

        <div className="toolbar-divider" />

        {/* Annuler / Rétablir */}
        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="toolbar-btn"
            title="Annuler (Ctrl+Z)"
          >
            <Undo2 />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="toolbar-btn"
            title="Rétablir (Ctrl+Y)"
          >
            <Redo2 />
          </button>
        </div>
      </div>

      {/* ===== ZONE D'ÉDITION ===== */}
      <EditorContent editor={editor} />

      {/* ===== MENU FLOTTANT — Disposition image ===== */}
      <ImageBubbleMenu editor={editor} />

      {/* ===== FOOTER — Compteur de mots ===== */}
      <div className="editor-footer">
        <span>{getWordCount()} mots · {getCharCount()} caractères</span>
        <span className="text-gray-400">Éditeur de texte riche</span>
      </div>

      {/* ===== MODAL — Insertion d'image ===== */}
      {showImageModal && (
        <div
          className="image-insert-modal-overlay"
          onClick={() => !uploading && setShowImageModal(false)}
        >
          <div
            className="image-insert-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 m-0">
                Insérer une image
              </h3>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                disabled={uploading}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Upload de fichier */}
            <div
              className={`upload-zone ${uploading ? 'uploading' : ''}`}
              onClick={() => !uploading && fileInputRef.current?.click()}
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-8 h-8 animate-spin text-[#0991b5]" />
                  <p className="text-sm text-gray-500">
                    Envoi en cours...
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-[#0991b5]">
                      Cliquez pour choisir
                    </span>{' '}
                    ou glissez un fichier ici
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG, JPG ou WEBP (Max. 5 Mo)
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
                disabled={uploading}
              />
            </div>

            {/* Séparateur OU */}
            <div className="or-divider">ou</div>

            {/* URL externe */}
            <input
              type="url"
              className="url-input"
              placeholder="Coller l'URL d'une image..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  insertImage(imageUrl);
                }
              }}
            />

            {/* Disposition de l'image */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Disposition de l'image :</label>
              <div className="flex gap-2">
                {[
                  { value: 'float-left' as ImageLayout, label: '← Gauche', desc: 'Texte à droite' },
                  { value: 'center' as ImageLayout, label: '↔ Centré', desc: 'Sans habillage' },
                  { value: 'float-right' as ImageLayout, label: 'Droite →', desc: 'Texte à gauche' },
                  { value: 'full-width' as ImageLayout, label: '⬛ Plein', desc: 'Toute la largeur' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setInsertLayout(opt.value)}
                    className={`flex-1 py-2 px-2 text-xs rounded-md border transition-all ${
                      insertLayout === opt.value
                        ? 'border-[#0991b5] bg-[#0991b5]/10 text-[#0991b5] font-semibold'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                    title={opt.desc}
                  >
                    <div className="font-medium">{opt.label}</div>
                    <div className="text-[10px] mt-0.5 opacity-70">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="modal-actions">
              <button
                type="button"
                onClick={() => {
                  setShowImageModal(false);
                  setImageUrl('');
                }}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                disabled={uploading}
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => insertImage(imageUrl)}
                disabled={!imageUrl || uploading}
                className="px-4 py-2 text-sm text-white bg-[#0991b5] rounded-md hover:bg-[#0880a0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Insérer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL — Lien hypertexte ===== */}
      {showLinkModal && (
        <div
          className="image-insert-modal-overlay"
          onClick={() => setShowLinkModal(false)}
        >
          <div
            className="image-insert-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 m-0">
                Ajouter un lien
              </h3>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <input
              type="url"
              className="url-input"
              placeholder="https://exemple.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  confirmLink();
                }
              }}
              autoFocus
            />

            <div className="modal-actions">
              <button
                type="button"
                onClick={() => {
                  setShowLinkModal(false);
                  setLinkUrl('');
                }}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              {editor.isActive('link') && (
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().unsetLink().run();
                    setShowLinkModal(false);
                    setLinkUrl('');
                  }}
                  className="px-4 py-2 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
                >
                  Supprimer le lien
                </button>
              )}
              <button
                type="button"
                onClick={confirmLink}
                disabled={!linkUrl}
                className="px-4 py-2 text-sm text-white bg-[#0991b5] rounded-md hover:bg-[#0880a0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Appliquer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
