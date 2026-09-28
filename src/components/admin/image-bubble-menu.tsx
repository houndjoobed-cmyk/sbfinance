'use client';

import React from 'react';
import { type Editor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import type { ImageLayout } from './image-layout-extension';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Maximize2,
  Trash2,
} from 'lucide-react';

interface ImageBubbleMenuProps {
  editor: Editor;
}

const LAYOUT_OPTIONS: {
  value: ImageLayout;
  icon: React.ReactNode;
  label: string;
}[] = [
  {
    value: 'float-left',
    icon: <AlignLeft className="w-4 h-4" />,
    label: 'Image à gauche, texte à droite',
  },
  {
    value: 'center',
    icon: <AlignCenter className="w-4 h-4" />,
    label: 'Centré (pleine largeur)',
  },
  {
    value: 'float-right',
    icon: <AlignRight className="w-4 h-4" />,
    label: 'Image à droite, texte à gauche',
  },
  {
    value: 'full-width',
    icon: <Maximize2 className="w-4 h-4" />,
    label: 'Pleine largeur',
  },
];

/**
 * Barre d'outils flottante affichée quand une image est sélectionnée.
 * Permet de choisir la disposition (float left/right, center, full) et la taille.
 */
export function ImageBubbleMenu({ editor }: ImageBubbleMenuProps) {
  const currentLayout =
    (editor.getAttributes('image').layout as ImageLayout) || 'center';
  
  const currentWidth = editor.getAttributes('image').width || '100%';

  const setLayout = (layout: ImageLayout) => {
    editor
      .chain()
      .focus()
      .updateAttributes('image', { layout })
      .run();
  };

  const setWidth = (width: string) => {
    editor
      .chain()
      .focus()
      .updateAttributes('image', { width })
      .run();
  };

  const removeImage = () => {
    editor.chain().focus().deleteSelection().run();
  };

  const WIDTH_OPTIONS = ['25%', '50%', '75%', '100%'];

  return (
    <BubbleMenu
      editor={editor}
      // @ts-expect-error - Les types de BubbleMenu n'incluent pas tippyOptions dans cette version mais ça marche au runtime
      tippyOptions={{ duration: 100, placement: 'bottom' }}
      shouldShow={({ editor }) => editor.isActive('image')}
      className="image-bubble-menu-container"
    >
      <div className="image-bubble-menu-content bg-white rounded-lg shadow-xl border border-gray-200 p-2 flex items-center gap-2 max-w-[95vw] overflow-x-auto">
        {/* SECTION: Disposition */}
        <div className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-1 mr-1 hidden sm:block">Disposition :</div>
        <div className="flex items-center gap-1">
          {LAYOUT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setLayout(opt.value)}
              className={`inline-flex items-center justify-center w-8 h-8 rounded-md transition-all ${
                currentLayout === opt.value
                  ? 'bg-[#0991b5] text-white border-transparent'
                  : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-100 hover:text-gray-900'
              }`}
              title={opt.label}
            >
              {opt.icon}
            </button>
          ))}
          
          <div className="w-px h-6 bg-gray-200 mx-1" />
          
          {/* SECTION: Taille */}
          <div className="text-xs font-semibold text-gray-500 whitespace-nowrap ml-1 mr-1 hidden sm:block">Taille :</div>
          {WIDTH_OPTIONS.map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => setWidth(w)}
              className={`inline-flex items-center justify-center h-8 px-2 text-[10px] font-bold rounded-md transition-all ${
                currentWidth === w
                  ? 'bg-[#0991b5] text-white border-transparent'
                  : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-100 hover:text-gray-900'
              }`}
              title={`Redimensionner à ${w}`}
            >
              {w}
            </button>
          ))}

          <div className="w-px h-6 bg-gray-200 mx-1" />
          
          <button
            type="button"
            onClick={removeImage}
            className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-white border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 transition-all"
            title="Supprimer l'image"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </BubbleMenu>
  );
}
