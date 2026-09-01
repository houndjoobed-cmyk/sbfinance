// Rename hero images to URL-safe names (no spaces, no accents, no apostrophes)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const heroDir = path.join(__dirname, '../public/images/hero');

const renames = {
  'Osez entreprendre.png': 'osez-entreprendre.png',
  'Cultivons la prospérité.png': 'cultivons-la-prosperite.png',
  "Soutenir l'économie local.png": 'soutenir-economie-locale.png',
  'BANNIERE 05.png': 'banniere-05.png',
  'BANNIERE 04 SITE.png': 'banniere-04-site.png',
  'Pour le financement inclusif.png': 'pour-le-financement-inclusif.png',
};

for (const [oldName, newName] of Object.entries(renames)) {
  const oldPath = path.join(heroDir, oldName);
  const newPath = path.join(heroDir, newName);
  
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${oldName} -> ${newName}`);
  } else {
    console.log(`Not found: ${oldName}`);
  }
}

console.log('\nDone!');
