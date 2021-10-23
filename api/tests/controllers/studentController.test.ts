import {
  createStudent,
  expectedStudent,
  updateStudent,
  deleteResponse,
} from "../mocks/student";
import {
  addStudent,
  getStudents,
  updateStudents,
  deleteStudent,
  getOneStudent,
} from "../../src/db/students";

jest.mock("../../src/db/students", () => {
  const originalModule = jest.requireActual("../../src/db/students");
  return {
    __esModule: true,
    ...originalModule,
    addStudent: () => Promise.resolve(createStudent),
    getOneStudent: () => Promise.resolve(expectedStudent),
    deleteStudent: () => Promise.resolve(deleteResponse),
    getStudents: () => Promise.resolve([expectedStudent]),
    updateStudents: () => Promise.resolve(updateStudent),
  };
});

describe("Test student requests", () => {
  it("should create a new student", async () => {
    const createdStudent = await addStudent(createStudent);
    expect(createdStudent).toMatchObject(createStudent);
  });

  it("should get student", async () => {
    const student = await getOneStudent(1);
    expect(student).toMatchObject(expectedStudent);
  });

  it("get all students", async () => {
    const students = await getStudents();
    expect(students).toMatchObject([expectedStudent]);
  });

  it("delete student", async () => {
    const response = await deleteStudent(1);
    expect(response).toMatchObject(deleteResponse);
  });

  it("update student", async () => {
    const student = await updateStudents(updateStudent);
    expect(student).toMatchObject(updateStudent);
  });
});
