const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const p = new PrismaClient({ adapter });

async function check() {
  const r = await p.parametresSite.findUnique({ where: { id: 1 } });
  if (r && r.accueilContenu) {
    const c = r.accueilContenu;
    if (c.hero) {
      console.log('Hero slides from DB:');
      console.log(JSON.stringify(c.hero, null, 2));
    } else {
      console.log('No hero key in accueilContenu');
      console.log('Keys in accueilContenu:', Object.keys(c));
    }
  } else {
    console.log('No accueilContenu found (field is null)');
  }
  await p.$disconnect();
}

check().catch(e => { console.error(e); process.exit(1); });
