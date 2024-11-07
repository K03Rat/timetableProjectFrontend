import { HttpStatusCode } from "axios";
import { Student } from "../interfaces/Student";
import apiClient from "./apiClient";

export const getStudents = async (): Promise<Student[]> => {
  const response = await apiClient.get("/students");
  console.log(response.data);
  return response.data;
};

export const deleteStudent = async (studentId: number): Promise<any> => {
  const response = await apiClient.delete(`/students/${studentId}`);
  console.log(response);
  return response;
};
export const updateStudent = async (
  studentId: number,
  updatedStudent: Student
): Promise<any> => {
  try {
    console.log(updatedStudent);
    const response = await apiClient.put(
      `/students/${studentId}`,
      updatedStudent,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Return response data if necessary
  } catch (error) {
    console.error("Error updating student:", error);
    throw error; // Rethrow error so that handleSaveUpdatedStudent can handle it
  }
};
export const addStudent = async (student: Student): Promise<any> => {
  try {
    console.log(student);
    const response = await apiClient.post("/students", student, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding new student: ", error);
    throw error;
  }
};
