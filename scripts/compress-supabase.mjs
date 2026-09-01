import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const SIZE_THRESHOLD = 1 * 1024 * 1024; // 1 MB

async function run() {
  console.log('Listing files in sbf-media bucket...');
  const { data: files, error } = await supabase.storage.from('sbf-media').list();
  
  if (error) {
    console.error('Error listing files:', error);
    return;
  }
  
  console.log(`Found ${files.length} files.`);
  
  for (const file of files) {
    // Only optimize if larger than threshold
    if (file.metadata && file.metadata.size > SIZE_THRESHOLD) {
      console.log(`\nOptimizing ${file.name} (${(file.metadata.size / 1024 / 1024).toFixed(2)} MB)...`);
      
      try {
        const { data: blob, error: dlError } = await supabase.storage.from('sbf-media').download(file.name);
        if (dlError) throw dlError;
        
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        // Compress using sharp
        const compressedBuffer = await sharp(buffer)
          .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 80 })
          .toBuffer();
          
        const newSize = compressedBuffer.length;
        console.log(`  -> Compressed to ${(newSize / 1024 / 1024).toFixed(2)} MB`);
        
        if (newSize < file.metadata.size) {
          // Re-upload
          const { error: ulError } = await supabase.storage.from('sbf-media').upload(file.name, compressedBuffer, {
            upsert: true,
            contentType: 'image/webp'
          });
          
          if (ulError) throw ulError;
          console.log(`  -> Successfully uploaded and replaced!`);
        } else {
          console.log(`  -> Compressed size is larger, skipping.`);
        }
      } catch (err) {
        console.error(`  -> Failed to optimize ${file.name}:`, err);
      }
    }
  }
  
  console.log('\nAll done!');
}

run();
