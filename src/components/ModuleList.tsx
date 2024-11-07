import React, { useEffect, useState } from "react";
import {
  getModules,
  addModule,
  updateModule,
  deleteModule,
} from "../services/moduleService";
import { Module } from "../interfaces/Module";
import ModuleModal from "./ModuleModal";

const ModuleList: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const data = await getModules();
      setModules(data);
    } catch (error) {
      console.error("Failed to fetch modules:", error);
    }
  };

  const handleAddNew = () => {
    setSelectedModule(null); // Set to `null` for a new entry
    setIsUpdateMode(false); // Set mode to "Add"
    setShowModal(true); // Show modal
  };

  const handleUpdate = (module: Module) => {
    setSelectedModule(module); // Populate with existing module
    setIsUpdateMode(true); // Set mode to "Update"
    setShowModal(true); // Show modal
  };

  const handleSaveModule = async (updatedModule: Module) => {
    try {
      if (isUpdateMode && selectedModule) {
        // Update existing module
        await updateModule(selectedModule.id, updatedModule);
        console.log("Updated module...");
      } else {
        // Add a new module
        await addModule(updatedModule);
        console.log("Added new module...");
      }
      fetchModules(); // Refresh list
      setShowModal(false); // Close modal
    } catch (error) {
      console.error("Failed to save module:", error);
    }
  };

  const handleDelete = async (moduleId: number) => {
    try {
      await deleteModule(moduleId);
      console.log(`Deleted module with ID: ${moduleId}`);
      fetchModules(); // Refresh list
    } catch (error) {
      console.error("Failed to delete module:", error);
    }
  };

  return (
    <div>
      <h1>Modules</h1>
      <button onClick={handleAddNew}>Add New Module</button>
      <table>
        <thead>
          <tr>
            <th>Module Code</th>
            <th>Module Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((module) => (
            <tr key={module.id}>
              <td>{module.moduleCode}</td>
              <td>{module.moduleName}</td>
              <td>
                <button onClick={() => handleUpdate(module)}>Update</button>
                <button onClick={() => handleDelete(module.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Conditionally render the ModuleModal component */}
      {showModal && (
        <ModuleModal
          module={selectedModule}
          onClose={() => setShowModal(false)}
          onSave={handleSaveModule}
          isUpdateMode={isUpdateMode}
        />
      )}
    </div>
  );
};

export default ModuleList;
