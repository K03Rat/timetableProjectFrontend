import apiClient from "./apiClient";
import { Module } from "../interfaces/Module";

export const getModules = async (): Promise<Module[]> => {
  const response = await apiClient.get("/modules");
  console.log(response);
  return response.data;
};
