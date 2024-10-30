import React, { useEffect, useState } from "react";
import { getLecturers } from "../services/lecturerService";
import { Lecturer } from "../interfaces/Lecturer";
import { ClipLoader } from "react-spinners";

const LecturerList: React.FC = () => {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const data = await getLecturers();
        setLecturers(data);
      } catch (error) {
        console.error("Failed to fetch lecturers:", error);
        setError("Failed to fetch lecturers from the database ):");
      } finally {
        setLoading(false);
      }
    };
    fetchLecturers();
  }, []);
  return (
    <div>
      <h1>Lecturers</h1>
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
              <th>id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {lecturers.map((lecturer) => (
              <tr key={lecturer.id}>
                <td>{lecturer.id}</td>
                <td>{lecturer.firstName}</td>
                <td>{lecturer.lastName}</td>
                <td>{lecturer.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
const centerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100px",
};

export default LecturerList;
