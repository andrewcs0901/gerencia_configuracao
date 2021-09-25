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

  it("bad request --fail case", async () => {
    await request
      .put(`/students/${null}`)
      .send(updateStudent)
      .expect(StatusCodes.BAD_REQUEST);
  });

  it("not found user id --fail case", async () => {
    await request
      .put("/students/5")
      .send(updateStudent)
      .expect(StatusCodes.NOT_FOUND);
  });

  it("should update student --success case", async () => {
    await request
      .put("/students/1")
      .send(updateStudent)
      .expect(StatusCodes.OK)
      .then((res) => expect(res.body).toMatchObject(updateStudent));
  });

  it(`should return status ${StatusCodes.NOT_FOUND} when student.id doesn't exists`, async () => {
    await supertest(app)
      .delete("/students/-1")
      .expect(StatusCodes.NOT_FOUND)
  });

  it(`should return status ${StatusCodes.OK} when student is deleted`, async () => {
    await supertest(app)
      .delete("/students/1")
      .expect(StatusCodes.OK)
      .then(res => expect(res.body.message).toBe("Success on delete"))
  });
});
