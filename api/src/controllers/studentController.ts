import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as StudentsDB from '../db/students';
import { Student } from './../../../web/src/types/Student';

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

    const student:Student[] = await StudentsDB.getOneEstudent(id);

    if (!student || student.length === 0 ) {
      return  res.status(StatusCodes.NOT_FOUND).send();
    }

    return res.status(StatusCodes.OK).json(student[0]);
  }

  async create(req: Request, res: Response) {
    const newStudent = await StudentsDB.addStudent(req.body);

    return res.status(StatusCodes.CREATED).json(newStudent);
  }
}
