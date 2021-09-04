import { celebrate, Joi } from "celebrate";
import express, { response } from "express";
import { StudentsController } from "./controllers/studentController";
import { StudentSchema } from "./types/Student";

const routes = express.Router();

const studentsController = new StudentsController();

routes.get("/ping", (_, res) => res.json("pong"));

routes.get("/students", studentsController.get);
routes.get("/students/:id", studentsController.getOne);

routes.post(
  "/students",
  celebrate({ body: Joi.object().keys(StudentSchema) }),
  studentsController.create
);
routes.put(
  "/student/:id",
  celebrate({ body: Joi.object().keys(StudentSchema) }),
  studentsController.update
);
//? Why not add an update, delete and get one routes/

export default routes;
