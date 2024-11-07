import apiClient from "./apiClient";
import { Lecturer } from "../interfaces/Lecturer";

export const getLecturers = async (): Promise<Lecturer[]> => {
  const response = await apiClient.get("/lecturer");
  console.log(response.data);
  return response.data;
};
export const getLecturerById = async (
  lecturerId: number
): Promise<Lecturer> => {
  const response = await apiClient.get(`/lecturer/${lecturerId}`);
  console.log(response);
  return response.data;
};

export const deleteLecturer = async (lecturerId: number | null) => {
  try {
    const response = await apiClient.delete(`/lecturer/${lecturerId}`);
    console.log(response);
  } catch (error) {
    console.error("Failed to delete lecturer", error);
  }
};

export const addLecturer = async (lecturer: Lecturer) => {
  try {
    const response = await apiClient.post("/lecturer", lecturer, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
export const updateLecturer = async (
  lecturerId: number,
  lecturer: Lecturer
) => {
  try {
    console.log(lecturer);
    const response = await apiClient.put(`lecturer/${lecturerId}`, lecturer, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
