import { PrismaClient } from "@prisma/client";

// the same client we use throughout the project!
const prisma = new PrismaClient();

export default prisma;