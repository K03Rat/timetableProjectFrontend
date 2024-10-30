import React, { useEffect, useState } from "react";
import { getTimetableSlots } from "../services/timetableSlotService";
import { TimetableSlot } from "../interfaces/TimetableSlot";
import { ClipLoader } from "react-spinners";

const TimetableSlotList: React.FC = () => {
  const [timetableSlots, setTimetableSlots] = useState<TimetableSlot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div>
      <h1>Timetable Slots</h1>
      {loading ? (
        <div style={centerStyle}>
          <ClipLoader color="#007bff" size={50} />
        </div>
      ) : error ? (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      ) : (
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
            </tr>
          </thead>
          <tbody>
            {timetableSlots.map((slot) => (
              <tr key={slot.id}>
                <td>{slot.module.moduleName}</td>
                <td>{slot.module.moduleCode}</td>
                <td>{slot.semester}</td>
                <td>{getDayName(slot.day)}</td>{" "}
                {/* Convert day number to name */}
                <td>
                  <td>{`${slot.time.hours}:${
                    slot.time.minutes !== undefined
                      ? String(slot.time.minutes).padStart(2, "0")
                      : "00"
                  }`}</td>
                </td>{" "}
                {/* Format time */}
                <td>{slot.venue}</td>
                <td>{getEventType(slot.type)}</td>{" "}
                {/* Convert type number to name */}
              </tr>
            ))}
          </tbody>
        </table>
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
