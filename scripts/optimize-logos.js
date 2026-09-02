const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const logosDir = path.join(__dirname, '..', 'public', 'images', 'logos');

async function processLogos() {
  const files = ['logo-sbf-color.png', 'logo-sbf.png', 'logo-sbf-web.png'];
  
  for (const file of files) {
    const inputPath = path.join(logosDir, file);
    if (!fs.existsSync(inputPath)) continue;

    const metadata = await sharp(inputPath).metadata();
    console.log(`Original ${file}: ${metadata.width}x${metadata.height}, size: ${(fs.statSync(inputPath).size / 1024).toFixed(1)} KB`);

    // Create a high-quality WebP version with reasonable dimensions (max width 600px for retina displays)
    const webpName = file.replace('.png', '.webp');
    const webpPath = path.join(logosDir, webpName);
    
    // We resize to a max width of 600px if it's larger (which is plenty sharp for a header displaying at 160-200px)
    await sharp(inputPath)
      .resize({ width: Math.min(metadata.width || 600, 600), withoutEnlargement: true })
      .webp({ quality: 90 })
      .toFile(webpPath);
    
    console.log(`Created ${webpName}: ${(fs.statSync(webpPath).size / 1024).toFixed(1)} KB`);

    // Also optimize the PNG itself so any fallback or existing references become tiny!
    const optPngBuffer = await sharp(inputPath)
      .resize({ width: Math.min(metadata.width || 600, 600), withoutEnlargement: true })
      .png({ compressionLevel: 9, quality: 90 })
      .toBuffer();
    
    // Backup original with .orig.png if not exists
    const backupPath = path.join(logosDir, file.replace('.png', '.orig.png'));
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
    }
    
    fs.writeFileSync(inputPath, optPngBuffer);
    console.log(`Optimized ${file}: ${(fs.statSync(inputPath).size / 1024).toFixed(1)} KB`);
  }
}

processLogos().catch(console.error);
