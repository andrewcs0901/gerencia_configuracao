import { Course } from "./Course";

export interface Student {
  id?: number;
  name: string;
  birth: Date;
  email: string;
  city: string;
  courses?: Course[];
}
