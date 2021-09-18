import app from "..";
import supertest from "supertest";
import { updateStudent } from "../mocks/student";

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

  it("should update student", async () => {
    const { body, statusCode } = await request
      .put("/students/1")
      .send(updateStudent);

    expect(statusCode).toBe(202);
    expect(body.name).toBe(updateStudent.name);
  });
});
