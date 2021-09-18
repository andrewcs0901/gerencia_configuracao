import app from "..";
import supertest from "supertest";
import { updateStudent } from "../mocks/student";
import { StatusCodes } from "http-status-codes";

const request = supertest(app);

describe("Test student requests", () => {
  it("should return the example student", async () => {
    await request
      .get("/students")
      .expect(200)
      .then((res) =>
        expect(res.body).toMatchObject([
          {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            city: "Belo Horizonte",
            birth: new Date("11/13/1999").toISOString(),
          },
        ])
      );
  });

  it("should create a new student", async () => {
    const newStudent = {
      name: "John Doe 2",
      email: "john.doe.2@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    };

    await request
      .post("/students")
      .send(newStudent)
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
});
