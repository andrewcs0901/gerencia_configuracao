import { getConnection } from "typeorm";
import { Student } from "../entities/Student";

const students: Student[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    city: "Belo Horizonte",
    birth: new Date("11/13/1999"),
  },
];

/**
 * Add new student to list
 * @param student New student
 * @returns new student
 */
async function addStudent(student: Student) {
  const newStudent = new Student(student);
  const connection = await getConnection().getRepository(Student);
  await connection.save(newStudent);
}

/**
 * Returns student list
 * @returns Students
 */
const getStudents = async () => getConnection().getRepository(Student).find();

/**
 * Find one student
 * @param id of student
 * @returns Students
 */
const getOneStudent = (id: number): Promise<any> => {
  return Promise.resolve(
    students.find((student: Student) => student.id === id)
  );
};

/**
 * Update student to list
 * @param student New student
 * *@returns Students
 */
function updateStudents(student: Student) {
  const index = students.findIndex((std) => std.id === student.id);
  if (index > -1) {
    students[index] = student;
    return Promise.resolve(students[index]);
  }
  return Promise.reject({ error: "student not found" });
}

/**
 * Delete one student
 * @param id of student
 * @returns Students
 */
const deleteStudent = (id: number): Promise<any> => {
  const entity = students.find((student: Student) => student.id === id);

  if (entity) {
    const index: number = students.indexOf(entity);

    students.splice(index, 1);

    return Promise.resolve(entity);
  }

  return Promise.resolve(null);
};

export {
  addStudent,
  getStudents,
  getOneStudent,
  updateStudents,
  deleteStudent,
};
