import apiClient from "./apiClient";
import { Course } from "../interfaces/Course";

export const getCourses = async (): Promise<Course[]> => {
  const response = await apiClient.get("/courses");
  console.log(response);
  return response.data;
};
