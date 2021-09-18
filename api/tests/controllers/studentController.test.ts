import supertest from "supertest";

import app from "..";
import {
  createStudent,
  expectedStudent,
  updateStudent,
} from "../mocks/student";

const request = supertest(app);

describe("Test student requests", () => {
  it("should return the example student", async () => {
    await request
      .get("/students")
      .expect(200)
      .then((res) => expect(res.body).toMatchObject([expectedStudent]));
  });

  it("should return one student --success case", async () => {
    await supertest(app)
      .get(`/students/${1}`)
      .expect(200)
      .then((res) => expect(res.body).toMatchObject(expectedStudent));
  });

  it("should return BAD_REQUEST student --fail case", async () => {
    await supertest(app).get(`/students/${null}`).expect(400);
  });

  it("should return NOTFOUND student --fail case", async () => {
    await supertest(app).get(`/students/${3}`).expect(404);
  });

  it("should create a new student", async () => {
    const newStudent = createStudent;

    await request
      .post("/students")
      .send(newStudent)
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
