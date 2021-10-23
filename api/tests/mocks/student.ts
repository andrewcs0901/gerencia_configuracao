const updateStudent = {
  id: 1,
  name: "John Doe updated",
  email: "john.doe@example.com",
  city: "Belo Horizonte",
  birth: new Date("11/13/1999"),
};

const createStudent = {
  name: "John Doe 2",
  email: "john.doe.2@example.com",
  city: "Belo Horizonte",
  birth: new Date("11/13/1999"),
};

const expectedStudent = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  city: "Belo Horizonte",
  birth: new Date("11/13/1999").toISOString(),
};

const deleteResponse = {
  message: "Success on delete",
  student: {
    raw: [],
    affected: 1,
  },
};

export { updateStudent, expectedStudent, createStudent, deleteResponse };
