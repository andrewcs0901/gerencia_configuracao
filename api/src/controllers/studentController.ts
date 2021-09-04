import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Student } from 'src/types/Student';

import * as StudentsDB from '../db/students';

export class StudentsController {
  async get(_: Request, res: Response) {
    const students = await StudentsDB.getStudents();

    return res.status(StatusCodes.OK).json(students);
  }

  async create(req: Request, res: Response) {
    const newStudent = await StudentsDB.addStudent(req.body);

    return res.status(StatusCodes.CREATED).json(newStudent);
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
