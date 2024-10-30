import { Day } from "./Day";
import { EventType } from "./EventType";
import { Module } from "./Module";
import { Time } from "./Time";

export interface TimetableSlot {
  id: number;
  semester: number;
  module: Module;
  time: Time;
  day: Day;
  venue: string;
  type: EventType;
}
