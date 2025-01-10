import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client
const prisma = new PrismaClient();

export const getAllGreeting = async () =>{
    const allGreeting = await prisma.greeting.findMany();
    return allGreeting;
  }