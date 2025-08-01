import { PrismaClient, Teacher } from '@prisma/client';
const prisma = new PrismaClient();

export async function createClass(teacher: Teacher) {
  return await prisma.schoolClass.create({
    data: {
      name: 'Turma A',
      year: 2025,
      teacherId: teacher.id,
    },
  });
}
