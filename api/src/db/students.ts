import { Student } from '../types/Student'; 

const students: Student[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    city: "Belo Horizonte",
    birth: new Date("11/13/1999"),
  },
];

/**
 * Add new student to list
 * @param student New student
 * @returns new student
 */
function addStudent(student: Student) {
  const newStudent = {
    id: students.length ? students[students.length - 1].id! + 1 : 1,
    ...student,
  };
  students.push(Object.freeze(newStudent));
  return Promise.resolve(newStudent);
}

/**
 * Returns student list
 * @returns Students
 */
const getStudents = () => Promise.resolve(Object.freeze([...students]));

const getOneStudent = (id: number): Promise<any> => { 
  return Promise.resolve(students.find((student:Student) => student.id === id));
};

/**
 * Update student to list
 * @param student New student
 * *@returns Students
 */
 function updateStudents(student: Student) {
  const index =  students.findIndex(std => std.id === student.id);
  if(index < -1) {
    students[index] = student;
    return Promise.resolve(students[index]);
  }
  return Promise.reject({error:"student not found"});
}

export { addStudent, getStudents, getOneStudent, updateStudents };


