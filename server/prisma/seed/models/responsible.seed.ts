import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

export async function createResponsible(responsibleUser: User) {
  return await prisma.responsible.create({
    data: {
      userId: responsibleUser.id,
    },
  });
}
