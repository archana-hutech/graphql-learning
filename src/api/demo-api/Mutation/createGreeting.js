import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createGreeting = async (_, { text }) => {
    const newGreeting = await prisma.greeting.create({
      data: { text },
    });
    return `Greeting created: ${newGreeting.text}`;
  }