import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { createUsers } from "./models/user.seed";
import { createTeacher } from "./models/teacher.seed";
import { createClass } from "./models/class.seed";
import { createStudent } from "./models/student.seed";
import { createResponsible } from "./models/responsible.seed";
import { linkResponsibleToStudent } from "./models/link.seed";
import { createGrade } from "./models/grade.seed";

async function main() {
  const { teacherUser, studentUser, responsibleUser } = await createUsers();

  const teacher = await createTeacher(teacherUser);
  const schoolClass = await createClass(teacher);
  const student = await createStudent(studentUser, schoolClass);
  const responsible = await createResponsible(responsibleUser);

  await linkResponsibleToStudent(responsible, student);
  await createGrade(student);

  console.log("✅ Seed finalizado!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
