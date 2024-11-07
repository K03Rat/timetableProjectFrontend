import React, { useEffect, useState } from "react";
import {
  deleteLecturer,
  getLecturers,
  addLecturer,
  updateLecturer,
} from "../services/lecturerService";
import { Lecturer } from "../interfaces/Lecturer";
import { ClipLoader } from "react-spinners";
import UpdateLecturerModal from "./LecturerModal";

const LecturerList: React.FC = () => {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(
    null
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);

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
  const fetchLecturers = async () => {
    try {
      const data = await getLecturers();
      setLecturers(data);
    } catch (error) {
      console.error("Failed to fetch lecturers:", error);
    }
  };

  const handleAddNew = () => {
    setSelectedLecturer(null); // Reset selected lecturer
    setIsUpdateMode(false); // Set to "Add" mode
    setShowModal(true); // Show modal
  };

  const handleUpdate = (lecturer: Lecturer) => {
    setSelectedLecturer(lecturer); // Set the lecturer to be updated
    setIsUpdateMode(true); // Set to "Update" mode
    setShowModal(true); // Show modal
  };

  const handleSaveUpdatedLecturer = async (updatedLecturer: Lecturer) => {
    try {
      if (isUpdateMode) {
        await updateLecturer(updatedLecturer.id, updatedLecturer);
        console.log("Lecturer updated");
      } else {
        await addLecturer(updatedLecturer);
        console.log("Lecturer added");
      }
      setShowModal(false); // Close modal
      fetchLecturers(); // Re-fetch the list after adding or updating
    } catch (error) {
      console.error("Failed to save lecturer", error);
    }
  };

  const handleDelete = async (lecturerId: number) => {
    try {
      await deleteLecturer(lecturerId);
      console.log(`Deleted lecturer with ID: ${lecturerId}`);
      fetchLecturers(); // Re-fetch after deletion
    } catch (error) {
      console.error("Failed to delete lecturer", error);
    }
  };

  return (
    <div>
      <h1>Lecturers</h1>
      <button onClick={handleAddNew}>Add New</button>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lecturers.map((lecturer) => (
              <tr key={lecturer.id}>
                <td>{lecturer.id}</td>
                <td>{lecturer.firstName}</td>
                <td>{lecturer.lastName}</td>
                <td>{lecturer.email}</td>
                <td>
                  <button onClick={() => handleUpdate(lecturer)}>Update</button>
                  <button onClick={() => handleDelete(lecturer.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for Add/Update */}
      {showModal && (
        <div className="modal-overlay">
          <UpdateLecturerModal
            lecturer={selectedLecturer}
            onClose={() => setShowModal(false)} // Close the modal
            onSave={handleSaveUpdatedLecturer} // Save updated lecturer
            isUpdateMode={isUpdateMode} // Pass mode (add or update) to the modal
          />
        </div>
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
