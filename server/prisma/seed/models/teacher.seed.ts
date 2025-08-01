import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

export async function createTeacher(teacherUser: User) {
  const teacher = await prisma.teacher.create({
    data: {
      userId: teacherUser.id,
    },
  });

  return teacher;
}
