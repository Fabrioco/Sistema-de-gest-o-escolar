import { PrismaClient } from '@prisma/client';
import { PasswordHelper } from '../../../src/utils/password-helper';
const prisma = new PrismaClient();

export async function createUsers() {
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: await PasswordHelper.hashPassword('admin123'),
      role: 'ADMIN',
    },
  });

  const teacherUser = await prisma.user.create({
    data: {
      name: 'Teacher John',
      email: 'john@example.com',
      password: await PasswordHelper.hashPassword('teacher123'),
      role: 'TEACHER',
    },
  });

  const studentUser = await prisma.user.create({
    data: {
      name: 'Student Ana',
      email: 'ana@example.com',
      password: await PasswordHelper.hashPassword('student123'),
      role: 'STUDENT',
    },
  });

  const responsibleUser = await prisma.user.create({
    data: {
      name: 'Responsible Maria',
      email: 'maria@example.com',
      password: await PasswordHelper.hashPassword('responsible123'),
      role: 'RESPONSIBLE',
    },
  });

  return { admin, teacherUser, studentUser, responsibleUser };
}
