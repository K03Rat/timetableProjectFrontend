import apiClient from "./apiClient";
import { Lecturer } from "../interfaces/Lecturer";

export const getLecturers = async (): Promise<Lecturer[]> => {
  const response = await apiClient.get("/lecturer");
  console.log(response.data);
  return response.data;
};
