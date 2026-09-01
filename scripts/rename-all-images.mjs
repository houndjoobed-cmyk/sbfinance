// Rename all remaining image files with spaces/accents to URL-safe names
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../public/images');

const renames = {
  'partenaires/Assurance 1.png': 'partenaires/assurance-1.png',
  'partenaires/Banque 1.png': 'partenaires/banque-1.png',
  'partenaires/Banque 2.png': 'partenaires/banque-2.png',
  'partenaires/Bnaque 3.png': 'partenaires/banque-3.png',
  'partenaires/Banque 4.png': 'partenaires/banque-4.png',
  'partenaires/Ecobank.png': 'partenaires/ecobank.png',
  'COUVERTIRE C4.png': 'couverture-c4.png',
  'BANNIERE.png': 'banniere.png',
  'REJOIGNEZ-NOUS.png': 'rejoignez-nous.png',
};

for (const [oldName, newName] of Object.entries(renames)) {
  const oldPath = path.join(publicDir, oldName);
  const newPath = path.join(publicDir, newName);
  
  if (fs.existsSync(oldPath)) {
    // Make sure directory exists
    fs.mkdirSync(path.dirname(newPath), { recursive: true });
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${oldName} -> ${newName}`);
  } else {
    console.log(`Not found: ${oldName}`);
  }
}

console.log('\nDone!');
