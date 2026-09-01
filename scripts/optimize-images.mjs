import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories to check
const targetDirs = [
  path.join(__dirname, '../public/images'),
  path.join(__dirname, '../public/images/hero'),
  path.join(__dirname, '../public/images/home'),
  path.join(__dirname, '../public/images/products'),
];

// Threshold to optimize: > 1MB
const SIZE_THRESHOLD = 1024 * 1024; 

async function optimizeImages() {
  console.log('Starting image optimization...');
  let totalSaved = 0;

  for (const dir of targetDirs) {
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isFile() && (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg'))) {
        if (stat.size > SIZE_THRESHOLD) {
          console.log(`Optimizing: ${file} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
          
          try {
            const tempPath = `${filePath}.tmp`;
            
            // Compress
            await sharp(filePath)
              .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true }) // Resize to max 1920
              .png({ quality: 80, compressionLevel: 9 }) // In case it's a PNG, compress it
              .jpeg({ quality: 80 }) // In case it's a JPEG
              .toFile(tempPath);

            const newStat = fs.statSync(tempPath);
            const saved = stat.size - newStat.size;
            totalSaved += saved;

            // Replace original
            fs.renameSync(tempPath, filePath);
            console.log(`  -> New size: ${(newStat.size / 1024 / 1024).toFixed(2)} MB (Saved: ${(saved / 1024 / 1024).toFixed(2)} MB)`);
          } catch (e) {
            console.error(`  -> Failed to optimize ${file}:`, e);
          }
        }
      }
    }
  }

  console.log(`\nOptimization complete! Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

optimizeImages();
