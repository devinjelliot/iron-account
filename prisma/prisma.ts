import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

// how do i set this for all environments?
if (["production", "development"].includes(process.env.NODE_ENV)) {
  global.prisma = prisma;
}


export default prisma;


