import { Course } from "./Course";
import { Lecturer } from "./Lecturer";
import { TimetableSlot } from "./TimetableSlot";

export interface Module {
  id: number;
  moduleCode: string;
  moduleName: string;
  courses?: Course[];
  timetableSlots?: TimetableSlot[];
  lecturers?: Lecturer[];
}
