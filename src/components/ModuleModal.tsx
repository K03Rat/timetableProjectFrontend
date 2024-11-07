import React, { useEffect, useState } from "react";
import { Module } from "../interfaces/Module";
import { Lecturer } from "../interfaces/Lecturer";
import { getLecturerById } from "../services/lecturerService";

interface ModuleModalProps {
  module: Module | null;
  onClose: () => void;
  onSave: (updatedModule: Module) => void;
  isUpdateMode: boolean;
}

const ModuleModal: React.FC<ModuleModalProps> = ({
  module,
  onClose,
  onSave,
  isUpdateMode,
}) => {
  const [formData, setFormData] = useState<Module>({
    id: 0,
    moduleName: "",
    moduleCode: "",
    lecturers: [], // Ensure it's initialized as an empty array
  });

  const [newLecturerId, setNewLecturerId] = useState<string>("");

  useEffect(() => {
    if (module) {
      // If updating, set formData to the module being edited
      setFormData(module);
    }
  }, [module]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddLecturer = async () => {
    if (newLecturerId) {
      try {
        const lecturer = await getLecturerById(parseInt(newLecturerId, 10));
        if (lecturer && lecturer.firstName && lecturer.lastName) {
          setFormData((prevData) => ({
            ...prevData,
            lecturers: [...(prevData.lecturers ?? []), lecturer], // Safely check for undefined
          }));
          setNewLecturerId(""); // Clear input after adding
        } else {
          alert("Lecturer not found or invalid data");
        }
      } catch (error) {
        console.error("Failed to fetch lecturer:", error);
      }
    }
  };

  const removeLecturer = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      lecturers: prevData.lecturers
        ? prevData.lecturers.filter((_, i) => i !== index)
        : [], // Check if lecturers is defined
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isUpdateMode ? "Update Module" : "Add New Module"}</h2>

        <label>
          Module Name:
          <input
            type="text"
            name="moduleName"
            value={formData.moduleName}
            onChange={handleChange}
          />
        </label>

        <label>
          Module Code:
          <input
            type="text"
            name="moduleCode"
            value={formData.moduleCode}
            onChange={handleChange}
          />
        </label>

        <h3 style={{ color: "black" }}>Lecturers</h3>

        <div className="lecturers-list">
          {(formData.lecturers ?? []).map((lecturer, index) => (
            <div key={lecturer.id} className="lecturer-item">
              <span>{`${lecturer.firstName} ${lecturer.lastName}`}</span>
              <button
                onClick={() => removeLecturer(index)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="add-lecturer">
          <input
            type="number"
            placeholder="Enter Lecturer ID"
            value={newLecturerId}
            onChange={(e) => setNewLecturerId(e.target.value)}
          />
          <button onClick={handleAddLecturer}>Add Lecturer</button>
        </div>

        <div className="modal-actions">
          <button onClick={handleSubmit}>
            {isUpdateMode ? "Update Module" : "Add Module"}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ModuleModal;
