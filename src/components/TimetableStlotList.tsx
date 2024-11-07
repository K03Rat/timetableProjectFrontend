import React, { useEffect, useState } from "react";
import {
  getTimetableSlots,
  deleteTimetableSlot,
  createTimetableSlot,
  updateTimetableSlot,
} from "../services/timetableSlotService"; // Assuming these functions are in your services.
import { TimetableSlot } from "../interfaces/TimetableSlot";
import { ClipLoader } from "react-spinners";
import TimetableSlotModal from "./TimetableSlotModal"; // Assuming you have a modal for adding/editing timetable slots

const TimetableSlotList: React.FC = () => {
  const [timetableSlots, setTimetableSlots] = useState<TimetableSlot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimetableSlot | null>(null);
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fetch timetable slots when component mounts
  useEffect(() => {
    const fetchTimetableSlots = async () => {
      try {
        const data = await getTimetableSlots();
        setTimetableSlots(data);
      } catch (error) {
        console.error("Failed to fetch timetable slots", error);
        setError("Failed to fetch timetables from the database ):");
      } finally {
        setLoading(false);
      }
    };
    fetchTimetableSlots();
  }, []);

  // Handle Add New Slot click
  const handleAddClick = () => {
    setIsUpdateMode(false); // Set to false for Add mode
    setSelectedSlot(null); // No slot selected for adding
    setIsModalOpen(true);
  };

  // Handle Edit (Update) Slot click
  const handleEditClick = (slot: TimetableSlot) => {
    setIsUpdateMode(true); // Set to true for Update mode
    setSelectedSlot(slot); // Set the selected slot for editing
    setIsModalOpen(true);
  };

  // Handle Delete Slot click
  const handleDeleteClick = async (slotId: number) => {
    try {
      await deleteTimetableSlot(slotId); // Delete the slot via the service
      setTimetableSlots(timetableSlots.filter((slot) => slot.id !== slotId)); // Remove the slot from the state
    } catch (error) {
      console.error("Failed to delete timetable slot", error);
      setError("Failed to delete the slot.");
    }
  };

  // Handle modal close action
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Handle save action (either create or update)
  const handleSave = async (updatedSlot: TimetableSlot) => {
    try {
      if (isUpdateMode && selectedSlot) {
        // Update the existing slot
        await updateTimetableSlot(updatedSlot); // Update the slot on the server
        setTimetableSlots((prevSlots) =>
          prevSlots.map((slot) =>
            slot.id === selectedSlot.id ? updatedSlot : slot
          )
        );
      } else {
        // Create a new slot
        await createTimetableSlot(updatedSlot); // Create a new slot on the server
        setTimetableSlots((prevSlots) => [...prevSlots, updatedSlot]);
      }
      setIsModalOpen(false); // Close the modal after saving
    } catch (error) {
      console.error("Failed to save timetable slot", error);
      setError("Failed to save the timetable slot.");
    }
  };

  return (
    <div>
      <h1>Timetable Slots</h1>
      <button onClick={handleAddClick}>Add New Slot</button>

      {loading ? (
        <div style={centerStyle}>
          <ClipLoader color="#007bff" size={50} />
        </div>
      ) : error ? (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Module Name</th>
                <th>Module Code</th>
                <th>Semester</th>
                <th>Day</th>
                <th>Time</th>
                <th>Venue</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {timetableSlots.map((slot) => (
                <tr key={slot.id}>
                  <td>{slot.module.moduleName}</td>
                  <td>{slot.module.moduleCode}</td>
                  <td>{slot.semester}</td>
                  <td>{getDayName(slot.day)}</td>
                  <td>{`${slot.time.hours}:${String(slot.time.minutes).padStart(
                    2,
                    "0"
                  )}`}</td>
                  <td>{slot.venue}</td>
                  <td>{getEventType(slot.type)}</td>
                  <td>
                    <button onClick={() => handleEditClick(slot)}>Edit</button>
                    <button onClick={() => handleDeleteClick(slot.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {isModalOpen && (
        <TimetableSlotModal
          timetableSlot={selectedSlot}
          onClose={handleModalClose}
          onSave={handleSave}
          isUpdateMode={isUpdateMode}
        />
      )}
    </div>
  );
};

// Helper function to convert day number to name
const getDayName = (dayNumber: number): string => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return days[dayNumber] || "Unknown"; // Return "Unknown" for invalid day numbers
};

// Helper function to convert type number to name
const getEventType = (typeNumber: number): string => {
  const eventTypes = [, "Lecture", "Lab", "Tutorial"];
  return eventTypes[typeNumber] || "Unknown"; // Return "Unknown" for invalid type numbers
};

const centerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100px",
};

export default TimetableSlotList;
