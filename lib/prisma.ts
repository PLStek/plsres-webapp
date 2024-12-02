import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

console.log("Initializing Prisma");
/* await prisma.$queryRawUnsafe("PRAGMA mmap_size = 268435456;");
await prisma.$queryRawUnsafe("PRAGMA cache_size = -200000;");
await prisma.$queryRawUnsafe("PRAGMA journal_mode = WAL;");
await prisma.$queryRawUnsafe("PRAGMA synchronous = NORMAL;");
await prisma.$queryRawUnsafe("PRAGMA temp_store = MEMORY;");
await prisma.$queryRawUnsafe("PRAGMA locking_mode = EXCLUSIVE;"); */
console.log("Prisma initialized");
