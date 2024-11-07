import React, { useState, useEffect } from "react";
import { Lecturer } from "../interfaces/Lecturer";

interface UpdateLecturerModalProps {
  lecturer: Lecturer | null;
  onClose: () => void;
  onSave: (updatedLecturer: Lecturer) => void;
  isUpdateMode: boolean;
}

const UpdateLecturerModal: React.FC<UpdateLecturerModalProps> = ({
  lecturer,
  onClose,
  onSave,
  isUpdateMode,
}) => {
  const [formData, setFormData] = useState<Lecturer>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (lecturer) {
      setFormData(lecturer); // Reset formData when lecturer changes
    }
  }, [lecturer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData); // Pass updated lecturer data to parent
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{isUpdateMode ? "Update Lecturer" : "Add New Lecturer"}</h2>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
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

export default UpdateLecturerModal;
