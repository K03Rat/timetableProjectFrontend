import React, { useState, useEffect } from "react";
import { TimetableSlot } from "../interfaces/TimetableSlot"; // Assuming this is your interface for TimetableSlot
import { Module } from "../interfaces/Module"; // Assuming this is your interface for Module
import apiClient from "../services/apiClient";

interface TimetableSlotModalProps {
  timetableSlot: TimetableSlot | null;
  onClose: () => void;
  onSave: (updatedTimetableSlot: TimetableSlot) => void;
  isUpdateMode: boolean;
}

const TimetableSlotModal: React.FC<TimetableSlotModalProps> = ({
  timetableSlot,
  onClose,
  onSave,
  isUpdateMode,
}) => {
  const [formData, setFormData] = useState<TimetableSlot>({
    id: 0,
    module: { id: 0, moduleCode: "", moduleName: "" }, // Module now holds full Module object
    semester: 0,
    day: 0,
    time: { hours: 0, minutes: 0 },
    venue: "",
    type: 1,
  });

  const [moduleId, setModuleId] = useState<number>(0);
  const [error, setError] = useState<string>("");

  // Fetch the module by ID when Module ID changes
  const fetchModuleById = async (id: number) => {
    if (id > 0) {
      try {
        const response = await apiClient.get(`/modules/${id}`);
        console.log(response);
        const module: Module = response.data;

        // If module is found, update the form
        setFormData((prevData) => ({
          ...prevData,
          module: {
            id: module.id,
            moduleCode: module.moduleCode,
            moduleName: module.moduleName,
          },
        }));
        setError(""); // Clear any previous error
      } catch (error) {
        setError("Module not found!"); // Set error if module doesn't exist
        setFormData((prevData) => ({
          ...prevData,
          module: { id: 0, moduleCode: "", moduleName: "" },
        }));
      }
    }
  };

  // Handle Module ID change
  const handleModuleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.value);
    setModuleId(id);
    fetchModuleById(id); // Fetch module details based on ID
  };

  // Update form data when timetableSlot changes (for update mode)
  useEffect(() => {
    if (timetableSlot) {
      setFormData(timetableSlot);
      setModuleId(timetableSlot.module.id); // Set Module ID for update mode
    }
  }, [timetableSlot]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: Number(value), // Ensure the value is converted to a number
    }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      time: {
        ...prevData.time,
        [name]: Number(value),
      },
    }));
  };

  const handleSubmit = () => {
    onSave(formData); // Submit the form data
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>
          {isUpdateMode ? "Update Timetable Slot" : "Add New Timetable Slot"}
        </h2>
        {/* Module ID */}
        <label>
          Module ID:
          <input
            type="number"
            name="moduleId"
            value={moduleId}
            onChange={handleModuleIdChange}
          />
        </label>
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Show error if module not found */}
        {/* Module Code */}
        <label>
          Module Code:
          <input
            type="text"
            name="moduleCode"
            value={formData.module.moduleCode}
            disabled
          />
        </label>
        {/* Module Name */}
        <label>
          Module Name:
          <input
            type="text"
            name="moduleName"
            value={formData.module.moduleName}
            disabled
          />
        </label>
        {/* Semester */}
        <label>
          Semester:
          <input
            type="number"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
          />
        </label>
        {/* Day Selector */}
        <label>
          Day:
          <select name="day" value={formData.day} onChange={handleSelectChange}>
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day, index) => (
              <option key={index} value={index}>
                {day}
              </option>
            ))}
          </select>
        </label>
        {/* Time (Hours and Minutes) */}
        <label>
          Time (HH:MM):
          <input
            type="number"
            name="hours"
            value={formData.time.hours}
            onChange={handleTimeChange}
            min="0"
            max="23"
            placeholder="HH"
          />
          :
          <input
            type="number"
            name="minutes"
            value={formData.time.minutes}
            onChange={handleTimeChange}
            min="0"
            max="59"
            placeholder="MM"
          />
        </label>
        {/* Venue */}
        <label>
          Venue:
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
          />
        </label>
        {/* Event Type */}
        <label>
          Event Type:
          <select
            name="type"
            value={formData.type}
            onChange={handleSelectChange}
          >
            <option value={1}>Lecture</option>
            <option value={2}>Lab</option>
            <option value={3}>Tutorial</option>
          </select>
        </label>
        {/* Modal Actions */}
        <div className="modal-actions">
          <button onClick={handleSubmit}>
            {isUpdateMode ? "Update Timetable Slot" : "Add Timetable Slot"}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TimetableSlotModal;
