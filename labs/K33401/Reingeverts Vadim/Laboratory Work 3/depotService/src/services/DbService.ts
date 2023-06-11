import { PrismaClient } from "@prisma/client";

// Prevents dev server hot reloading from duplicating clients
// https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#prismaclient-in-long-running-applications
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

class DbService {
    protected db = prisma;
}

export default DbService;
