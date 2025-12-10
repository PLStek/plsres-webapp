import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

console.log(
    "Initializing the database. Make sure the path to the local database exists."
);
const adapter = new PrismaLibSQL({
    url: process.env.LOCAL_DATABASE_URL,
    syncUrl: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
    syncInterval: 1000 * 1800, // 30 min
});

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

console.log("Prisma initialized");
