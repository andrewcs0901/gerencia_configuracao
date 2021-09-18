import { StatusCodes } from 'http-status-codes';
import supertest from 'supertest';

import app from '..';
import { createStudent, expectedStudent, updateStudent } from '../mocks/student';

const request = supertest(app);

describe("Test student requests", () => {
  it("should return the example student", async () => {
    await request
      .get("/students")
      .expect(StatusCodes.OK)
      .then((res) => expect(res.body).toMatchObject([expectedStudent]));
  });

  it("should return one student --success case", async () => {
    await request
      .get(`/students/${1}`)
      .expect(StatusCodes.OK)
      .then((res) => expect(res.body).toMatchObject(expectedStudent));
  });

  it("should return BAD_REQUEST student --fail case", async () => {
    await request.get(`/students/${null}`).expect(StatusCodes.BAD_REQUEST);
  });

  it("should return NOTFOUND student --fail case", async () => {
    await request.get(`/students/${3}`).expect(StatusCodes.NOT_FOUND);
  });

  it("should create a new student", async () => {
    const newStudent = createStudent;

    await request
      .post("/students")
      .send(newStudent)
      .expect(StatusCodes.CREATED)
      .then((res) => expect(res.body).toMatchObject({ id: 2, ...newStudent }));
  });

  it("should update student", async () => {
    const { body, statusCode } = await request
      .put("/students/1")
      .send(updateStudent);

    expect(statusCode).toBe(202);
    expect(body.name).toBe(updateStudent.name);
  });
});
