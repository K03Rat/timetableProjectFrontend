// src/components/CourseList.tsx
import React, { useEffect, useState } from "react";
import { getCourses } from "../services/courseService";
import { Course } from "../interfaces/Course";

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Courses</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Code</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;
