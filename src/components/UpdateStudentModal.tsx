import React, { useEffect, useState } from "react";
import { Student } from "../interfaces/Student";

interface UpdateStudentModalProps {
  student: Student;
  onClose: () => void;
  onSave: (updatedStudent: Student) => void;
  isUpdateMode: boolean; // Flag to determine whether in Add or Update mode
}

const UpdateStudentModal: React.FC<UpdateStudentModalProps> = ({
  student,
  onClose,
  onSave,
  isUpdateMode,
}) => {
  const [formData, setFormData] = useState<Student>(student);

  useEffect(() => {
    setFormData(student); // Reset formData when student changes
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData); // Pass updated student data to parent
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{isUpdateMode ? "Update Student" : "Add New Student"}</h2>
        <label>
          First Name:
          <input
            type="text"
            name="studentFirstName"
            value={formData.studentFirstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="studentLastName"
            value={formData.studentLastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="studentEmail"
            value={formData.studentEmail}
            onChange={handleChange}
          />
        </label>
        <label>
          Course ID:
          <input
            type="number"
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
          />
        </label>
        <label>
          Student ID:
          <input
            type="number"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
          />
        </label>
        <div>
          <button onClick={handleSubmit}>
            {isUpdateMode ? "Update" : "Add"}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudentModal;
