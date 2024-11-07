// src/components/CourseList.tsx
import React, { useEffect, useState } from "react";
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../services/courseService"; // Adjust these import paths
import { Course } from "../interfaces/Course"; // Adjust this import path
import CourseModal from "./CourseModal"; // Adjust this import path

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  // Fetch courses from the API when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses(); // Fetch the courses
        setCourses(data); // Update state with fetched courses
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchCourses();
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  // Handler for adding a new course
  const handleAddNew = () => {
    setSelectedCourse(null); // Set selected course to `null` for new course
    setIsUpdateMode(false); // Set to "Add" mode
    setShowModal(true); // Show modal for adding a new course
  };

  // Handler for updating an existing course
  const handleUpdate = (course: Course) => {
    setSelectedCourse(course); // Populate the selected course for updating
    setIsUpdateMode(true); // Set to "Update" mode
    setShowModal(true); // Show modal for updating the course
  };

  // Handler for deleting a course
  const handleDelete = async (courseId: number) => {
    try {
      await deleteCourse(courseId); // Call the delete API function
      setCourses(courses.filter((course) => course.id !== courseId)); // Remove course from state
      console.log(`Course with ID: ${courseId} deleted.`);
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  // Handler for saving a course (either new or updated)
  const handleSaveCourse = async (updatedCourse: Course) => {
    try {
      if (isUpdateMode && selectedCourse) {
        // Update the existing course
        await updateCourse(updatedCourse); // API function to update course
        console.log("Updated course:", updatedCourse);
      } else {
        // Add a new course
        await addCourse(updatedCourse); // API function to add course
        console.log("Added new course:", updatedCourse);
      }
      setShowModal(false); // Close the modal after saving
      const data = await getCourses(); // Refresh the list of courses after save
      setCourses(data); // Update state with the new course list
    } catch (error) {
      console.error("Failed to save course:", error);
    }
  };

  return (
    <div>
      <h1>Courses</h1>

      {/* Button to trigger adding a new course */}
      <button onClick={handleAddNew}>Add New Course</button>

      {/* Courses Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.code}</td>
                <td>
                  <button onClick={() => handleUpdate(course)}>Update</button>
                  <button onClick={() => handleDelete(course.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No courses available.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Conditionally render the CourseModal for adding or updating a course */}
      {showModal && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setShowModal(false)}
          onSave={handleSaveCourse}
          isUpdateMode={isUpdateMode}
        />
      )}
    </div>
  );
};

export default CourseList;
