import React, { useEffect, useState } from "react";
import { Student } from "../interfaces/Student";
import {
  deleteStudent,
  getStudents,
  addStudent,
  updateStudent,
} from "../services/studentService";
import UpdateStudentModal from "./UpdateStudentModal";

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false); // Track mode (add or update)

  // Fetch students when component mounts
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

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error("Failed to fetch students", error);
    }
  };

  // Handle adding a new student
  const handleAddNew = () => {
    setSelectedStudent(null);
    setIsUpdateMode(false); // Set to "Add" mode
    setShowModal(true); // Show the modal
  };

  // Handle updating a student
  const handleUpdate = (student: Student) => {
    setSelectedStudent(student);
    setIsUpdateMode(true); // Set to "Update" mode
    setShowModal(true); // Show the modal
  };

  // Handle saving the student (either add or update)
  const handleSaveUpdatedStudent = async (updatedStudent: any) => {
    try {
      if (isUpdateMode) {
        // Update the student
        if (selectedStudent) {
          await updateStudent(updatedStudent.studentId, updatedStudent);
          console.log("Student updated");
        }
      } else {
        // Add a new student
        await addStudent(updatedStudent);
        console.log("Student added");
      }
      fetchStudents(); // Re-fetch the list after adding or updating
    } catch (error) {
      console.error("Failed to save student", error);
    }
    setShowModal(false); // Close the modal after saving
  };

  // Handle deleting a student
  const handleDelete = async (studentId: any) => {
    try {
      await deleteStudent(studentId);
      console.log(`Delete student with ID: ${studentId}`);
      fetchStudents(); // Re-fetch the list after deletion
    } catch (error) {
      console.error("Failed to delete student", error);
    }
  };

  return (
    <div>
      <h1>Students</h1>
      <button onClick={handleAddNew}>Add New</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student First Name</th>
            <th>Student Last Name</th>
            <th>Student Email</th>
            <th>Student Course</th>
            <th>Actions</th>
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
              <td>
                <button onClick={() => handleUpdate(student)}>Update</button>
                <button onClick={() => handleDelete(student.studentId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add/Update */}
      {showModal && (
        <div className="modal-overlay">
          <UpdateStudentModal
            student={selectedStudent || ({} as Student)}
            onClose={() => setShowModal(false)} // Close the modal
            onSave={handleSaveUpdatedStudent} // Save updated student
            isUpdateMode={isUpdateMode} // Pass mode (add or update) to the modal
          />
        </div>
      )}
    </div>
  );
};

export default StudentList;
