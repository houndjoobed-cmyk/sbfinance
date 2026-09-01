'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { ImagePlus, Loader2, X } from 'lucide-react';
import imageCompression from 'browser-image-compression';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      let file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);
      setError(null);

      // Compress image
      const options = {
        maxSizeMB: 1, // Max 1MB
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/webp', // Convert to WebP for best compression
      };
      
      try {
        file = await imageCompression(file, options);
      } catch (compressionError) {
        console.error('Error compressing image:', compressionError);
        // Continue with original file if compression fails
      }

      // Create a unique file name
      // Always use .webp since we compress to webp if possible
      const fileExt = file.type === 'image/webp' ? 'webp' : file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('sbf-media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('sbf-media')
        .getPublicUrl(filePath);

      onChange(publicUrl);
    } catch (err: any) {
      console.error('Error uploading image:', err);
      setError(err.message || "Erreur lors de l'upload de l'image.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    // Note: We are just removing the link from the database here.
    // In a production system, you might want to also delete the file from Supabase storage.
    onChange('');
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {value ? (
        <div className="relative inline-block border rounded-md overflow-hidden bg-gray-50 p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={value} 
            alt="Uploaded image" 
            className="h-40 w-auto object-contain rounded-md" 
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-4 right-4 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 shadow-sm transition-colors"
            title="Supprimer l'image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
              {uploading ? (
                <>
                  <Loader2 className="w-8 h-8 mb-4 animate-spin text-[#0991b5]" />
                  <p className="text-sm">Envoi en cours...</p>
                </>
              ) : (
                <>
                  <ImagePlus className="w-8 h-8 mb-4 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Cliquez pour ajouter</span> ou glissez une image ici</p>
                  <p className="text-xs text-gray-500">PNG, JPG ou WEBP (Max. 5Mo)</p>
                </>
              )}
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>
        </div>
      )}
    </div>
  );
}
