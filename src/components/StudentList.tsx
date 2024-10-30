import React, { useEffect, useState } from "react";
import { Student } from "../interfaces/Student";
import { getStudents } from "../services/studentService";

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch students", error);
      }
    };
    fetchStudents();
  }, []);
  return (
    <div>
      <h1>Students</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student first name</th>
            <th>Student last name</th>
            <th>Student email</th>
            <th>Student course</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId}>
              <td>{student.studentId}</td>
              <td>{student.studentFirstName}</td>
              <td>{student.studentLastName}</td>
              <td>{student.studentEmail}</td>
              <td>{student.courseId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
