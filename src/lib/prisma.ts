import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const DEFAULT_DATABASE_URL =
  "postgresql://postgres.zympcihvfsxdlxuvaqtc:rK2ik0G338m6986Z@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1";

const prismaClientSingleton = () => {
  const connectionString =
    process.env.DATABASE_URL ||
    process.env.DIRECT_URL ||
    DEFAULT_DATABASE_URL;

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
