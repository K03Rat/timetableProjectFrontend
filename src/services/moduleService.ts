import apiClient from "./apiClient";
import { Module } from "../interfaces/Module";

export const getModules = async (): Promise<Module[]> => {
  const response = await apiClient.get("/modules");
  console.log(response);
  return response.data;
};
export const addModule = async (module: Module) => {
  try {
    const response = await apiClient.post("/modules", module, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
export const updateModule = async (moduleId: number, module: Module) => {
  try {
    const response = await apiClient.put(`/modules/${moduleId}`, module, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
export const deleteModule = async (moduleid: number) => {
  try {
    const response = await apiClient.delete(`/modules/${moduleid}`);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
