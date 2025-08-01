import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createUsers() {
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'ADMIN',
    },
  });

  const teacherUser = await prisma.user.create({
    data: {
      name: 'Teacher John',
      email: 'john@example.com',
      password: 'teacher123',
      role: 'TEACHER',
    },
  });

  const studentUser = await prisma.user.create({
    data: {
      name: 'Student Ana',
      email: 'ana@example.com',
      password: 'student123',
      role: 'STUDENT',
    },
  });

  const responsibleUser = await prisma.user.create({
    data: {
      name: 'Responsible Maria',
      email: 'maria@example.com',
      password: 'responsible123',
      role: 'RESPONSIBLE',
    },
  });

  return { admin, teacherUser, studentUser, responsibleUser };
}
