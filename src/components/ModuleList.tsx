import React, { useEffect, useState } from "react";
import { getModules } from "../services/moduleService";
import { Module } from "../interfaces/Module";

const ModuleList: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]); // renamed to 'modules' for clarity

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const data = await getModules();
        setModules(data);
      } catch (error) {
        console.error("Failed to fetch modules:", error);
      }
    };
    fetchModules();
  }, []);

  return (
    <div>
      <h1>Modules</h1>
      <table>
        <thead>
          <tr>
            <th>Module code</th>
            <th>Module name</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((module) => (
            <tr key={module.id}>
              <td>{module.moduleCode}</td>

              <td>{module.moduleName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModuleList;
