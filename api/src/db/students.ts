import { getConnection } from "typeorm";
import { Student } from "../entities/Student";

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
const getOneStudent = async (id: number): Promise<Student | undefined> => {
  const student = await getConnection()
    .getRepository(Student)
    .findOne({ where: { id: id } });
  return student;
};

/**
 * Update student to list
 * @param student New student
 * *@returns Students
 */
const updateStudents = async (
  student: Student
): Promise<Student | undefined> => {
  return await getConnection().getRepository(Student).save(student);
};

/**
 * Delete one student
 * @param id of student
 * @returns Students
 */
const deleteStudent = async (id: number): Promise<any> => {
  return await getConnection().getRepository(Student).delete(id);
};

export {
  addStudent,
  getStudents,
  getOneStudent,
  updateStudents,
  deleteStudent,
};
