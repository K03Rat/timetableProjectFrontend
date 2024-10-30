import { getTimetableForCourse } from "../services/timetableSlotService";
import { TimetableSlot } from "../interfaces/TimetableSlot";
import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const CourseTimetable: React.FC = () => {
  const [timetableSlots, setTimetableSlots] = useState<TimetableSlot[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [semester, setSemester] = useState<string>("");

  const fetchCourses = async (courseId: string, semester: number) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getTimetableForCourse(courseId);
      const filteredData = data.filter((item) => item.semester === semester);
      setTimetableSlots(filteredData);
    } catch (error) {
      console.error(`Failed to fetch timetable for course`, error);
      setError("Failed to fetch data from the database");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchClick = () => {
    if (!searchTerm.trim() || !semester.trim()) {
      setError("Please enter both course code and semester");
      return;
    }

    const parsedSemester = parseInt(semester, 10);
    if (isNaN(parsedSemester)) {
      setError("Semester must be a valid number");
      return;
    }

    fetchCourses(searchTerm, parsedSemester);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter course code"
        style={{ marginBottom: "10px" }}
      />
      <input
        type="number"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
        placeholder="Enter semester"
        style={{ marginBottom: "10px" }}
      />
      <button onClick={handleFetchClick} style={{ marginBottom: "20px" }}>
        Fetch Timetable
      </button>
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
              <th>Module Code</th>
              <th>Module Name</th>
              <th>Day</th>
              <th>Time</th>
              <th>Venue</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {timetableSlots.map((slot) => (
              <tr key={slot.id}>
                <td>{slot.module.moduleCode}</td>
                <td>{slot.module.moduleName}</td>
                <td>{getDayName(slot.day)}</td>
                <td>{`${slot.time.hours}:${String(slot.time.minutes).padStart(
                  2,
                  "0"
                )}`}</td>
                <td>{slot.venue}</td>
                <td>{getEventType(slot.type)}</td>
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
  return days[dayNumber] || "Unknown";
};

// Helper function to convert type number to name
const getEventType = (typeNumber: number): string => {
  const eventTypes = ["", "Lecture", "Lab", "Tutorial"];
  return eventTypes[typeNumber] || "Unknown";
};

const centerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100px",
};

export default CourseTimetable;
