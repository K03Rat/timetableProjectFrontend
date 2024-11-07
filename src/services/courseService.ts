import apiClient from "./apiClient";
import { Course } from "../interfaces/Course";

// Fetch courses
export const getCourses = async (): Promise<Course[]> => {
  try {
    const response = await apiClient.get("/courses");
    console.log("Courses fetched:", response.data); // Log only the response data
    return response.data;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    throw error; // Optionally throw the error to handle it elsewhere
  }
};

// Add a new course
export const addCourse = async (course: Course) => {
  try {
    const response = await apiClient.post("/courses", course, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Course added:", response.data); // Log the response data
    return response.data; // You might want to return the added course (response.data)
  } catch (error) {
    console.error("Failed to add course:", error);
    throw error; // Optionally throw the error
  }
};

// Update an existing course
export const updateCourse = async (course: Course) => {
  try {
    console.log("Updating course:", course);
    const response = await apiClient.put(`/courses/${course.id}`, course, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Course updated:", response.data); // Log the response data
    return response.data; // You might want to return the updated course (response.data)
  } catch (error) {
    console.error("Failed to update course:", error);
    throw error; // Optionally throw the error
  }
};

// Delete a course
export const deleteCourse = async (courseId: number) => {
  try {
    const response = await apiClient.delete(`/courses/${courseId}`);
    console.log("Course deleted:", response.data); // Log the response data
    return response.data; // You might want to return a success confirmation (response.data)
  } catch (error) {
    console.error("Failed to delete course:", error);
    throw error; // Optionally throw the error
  }
};
