import { Student } from "../interfaces/Student";
import apiClient from "./apiClient";

export const getStudents = async (): Promise<Student[]> => {
  const response = await apiClient.get("/students");
  console.log(response.data);
  return response.data;
};
