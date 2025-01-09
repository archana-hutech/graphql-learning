import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client
const prisma = new PrismaClient();

export const getGreeting = async () => {
    const getGreeting = await prisma.greeting.findFirst({
      orderBy:{
        // id: 'desc'
        createdAt: 'desc'
      }
    });
    return getGreeting ? getGreeting.text : 'No greeting found!';
  }