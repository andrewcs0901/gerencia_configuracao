import * as StudentsDB from "../db/students";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Student } from "src/types/Student";

export class StudentsController {
  async get(_: Request, res: Response) {
    const students = await StudentsDB.getStudents();

    return res.status(StatusCodes.OK).json(students);
  }

  async create(req: Request, res: Response) {
    const newStudent = await StudentsDB.addStudent(req.body);

    return res.status(StatusCodes.CREATED).json(newStudent);
  }

  async update(req: Request, res: Response) {
    const id:number = Number(req.params.id);
    const student:Student = req.body
    student.id = id
    try{
      const newStudent = await StudentsDB.updateStudents(student);
      return res.status(StatusCodes.ACCEPTED).json(newStudent);
    }catch(err){
      return res.status(StatusCodes.NOT_FOUND).json(err)
    }
  }
}
