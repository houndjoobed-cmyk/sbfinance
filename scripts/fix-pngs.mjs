import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesDir = path.join(__dirname, '../public/images');

async function fixPngs(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await fixPngs(filePath);
    } else if (file.toLowerCase().endsWith('.png')) {
      const tempPath = filePath + '.temp.png';
      try {
        // Read the current file (which might actually be a JPEG internally)
        const buffer = fs.readFileSync(filePath);
        
        // Force output to proper PNG
        await sharp(buffer)
          .png({ quality: 80, compressionLevel: 9 })
          .toFile(tempPath);
          
        // Replace the file
        fs.renameSync(tempPath, filePath);
        console.log(`Fixed format for: ${file}`);
      } catch (err) {
        console.error(`Failed to fix ${file}:`, err);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    }
  }
}

console.log('Fixing PNG files...');
fixPngs(imagesDir).then(() => console.log('Done!'));
