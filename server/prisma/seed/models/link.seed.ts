import { PrismaClient, Responsible, Student } from '@prisma/client';
const prisma = new PrismaClient();

export async function linkResponsibleToStudent(responsible: Responsible, student: Student) {
  await prisma.responsibleStudent.create({
    data: {
      responsibleId: responsible.id,
      studentId: student.id,
    },
  });
}
