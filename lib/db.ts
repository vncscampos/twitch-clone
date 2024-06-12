import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// previne o hot reload do nextjs criar vários clientes Prisma desnecessários
export const db = globalThis.prisma || new PrismaClient();

// em PROD não tem hot reload
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
