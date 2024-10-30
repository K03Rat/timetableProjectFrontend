import { Module } from "../interfaces/Module";
import { Time } from "../interfaces/Time";
import { TimetableSlot } from "../interfaces/TimetableSlot";

export function normalizeTimetableSlot(data: any): TimetableSlot {
  // Normalize the time from the raw string format
  const [hours, minutes] = data.startTime.split(":").map(Number);
  const time: Time = { hours, minutes };

  // Normalize the module
  const module: Module = {
    id: data.module.id,
    moduleName: data.module.moduleName,
    moduleCode: data.module.moduleCode,
    lecturers: data.module.lecturers,
  };

  // Map the other properties
  const timetableSlot: TimetableSlot = {
    id: data.id,
    semester: data.semester,
    module: module,
    time: time,
    day: data.dayOfWeek, // Assuming dayOfWeek is already an enum value
    venue: data.venue,
    type: data.type, // Assuming type is already an enum value
  };

  return timetableSlot;
}
