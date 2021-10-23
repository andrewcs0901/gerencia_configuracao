import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as StudentsDB from "../db/students";
import { Student } from "./../../../web/src/types/Student";

export class StudentsController {
  async get(_: Request, res: Response) {
    const students = await StudentsDB.getStudents();

    return res.status(StatusCodes.OK).json(students);
  }

  async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).send();
    }

    const student: Student | undefined = await StudentsDB.getOneStudent(id);

    if (!student) {
      return res.status(StatusCodes.NOT_FOUND).send();
    }

    return res.status(StatusCodes.OK).json(student);
  }

  async create(req: Request, res: Response) {
    const newStudent = await StudentsDB.addStudent(req.body);

    return res.status(StatusCodes.CREATED).json(newStudent);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).send();
    }
    const student: Student = req.body;
    student.id = id;

    try {
      const newStudent = await StudentsDB.updateStudents(student);
      return res.status(StatusCodes.OK).json(newStudent);
    } catch (err) {
      return res.status(StatusCodes.NOT_FOUND).json(err);
    }
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).send();
    }

    const student: Student = await StudentsDB.deleteStudent(id);

    if (!student) {
      return res.status(StatusCodes.NOT_FOUND).send();
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "Success on delete", student });
  }
}
