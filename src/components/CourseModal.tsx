import React, { useEffect, useState } from "react";
import { Course } from "../interfaces/Course"; // Adjust this according to your interfaces

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onSave: (updatedCourse: Course) => void;
  isUpdateMode: boolean;
}

const CourseModal: React.FC<CourseModalProps> = ({
  course,
  onClose,
  onSave,
  isUpdateMode,
}) => {
  // State for form data, only includes course code and name for now
  const [formData, setFormData] = useState<Course>({
    id: 0,
    code: "",
    modules: [], // modules will be excluded in the form
  });

  // Update form data when the course prop changes (for update mode)
  useEffect(() => {
    if (course) {
      setFormData({
        id: course.id,
        code: course.code,
        modules: [], // Reset modules to empty (do not include when updating)
      });
    }
  }, [course]);

  // Handle changes to input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit the form data (without modules) to the parent component
  const handleSubmit = () => {
    onSave(formData); // Save the course data (no modules included)
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isUpdateMode ? "Update Course" : "Add New Course"}</h2>

        {/* Course Code input */}
        <label>
          Course Code:
          <input
            type="text"
            name="code" // Ensure the name corresponds with the state key
            value={formData.code} // Correct the value to formData.code
            onChange={handleChange}
          />
        </label>

        {/* Optional: Do not display the list of modules */}
        {/* As modules are not included in the body during updates, skip rendering them */}

        <div className="modal-actions">
          <button onClick={handleSubmit}>
            {isUpdateMode ? "Update Course" : "Add Course"}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
