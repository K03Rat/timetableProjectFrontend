import { Module } from "./Module";

export interface Lecturer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  modules?: Module[];
}
