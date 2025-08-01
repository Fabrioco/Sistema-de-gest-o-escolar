import { PrismaClient, User, SchoolClass } from '@prisma/client';
const prisma = new PrismaClient();

export async function createStudent(studentUser: User, schoolClass: SchoolClass) {
  return await prisma.student.create({
    data: {
      userId: studentUser.id,
      classId: schoolClass.id,
    },
  });
}
