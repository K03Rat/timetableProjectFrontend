import { Module } from "./Module";

export interface Course {
  id: number;
  code: string;
  modules?: Module[]; //optional array of Module
}
