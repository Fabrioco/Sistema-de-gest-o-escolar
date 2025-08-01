import { PrismaClient, Student } from "@prisma/client";
const prisma = new PrismaClient();

export async function createGrade(student: Student) {
  await prisma.grade.create({
    data: {
      value: 9.5,
      subject: "Matemática",
      studentId: student.id,
    },
  });
}
