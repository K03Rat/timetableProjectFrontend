import apiClient from "./apiClient";
import { TimetableSlot } from "../interfaces/TimetableSlot";
import { normalizeTimetableSlot } from "./normalise"; // Import the normalization function

export const getTimetableSlots = async (): Promise<TimetableSlot[]> => {
  try {
    const response = await apiClient.get("/timetables");

    // Normalize the data using the normalization function
    const normalizedSlots: TimetableSlot[] = response.data.map(
      normalizeTimetableSlot
    );

    return normalizedSlots;
  } catch (error) {
    console.error("Error fetching timetable slots:", error);
    throw new Error("Failed to fetch timetable slots"); // Optionally re-throw the error
  }
};

export const getTimetableForCourse = async (
  courseId: string
): Promise<TimetableSlot[]> => {
  const response = await apiClient.get(
    `timetables/details?courseCode=${courseId}`
  );
  console.log(response);

  // Helper function to parse time in "HH:MM:SS" format
  function parseTime(timeStr: string) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return { hours, minutes };
  }

  // Convert the raw data into an array of TimetableSlot objects
  function convertToTimetableSlots(data: any[][]): TimetableSlot[] {
    return data.map((item, index) => ({
      id: index + 1, // Generate a unique ID based on the index
      semester: item[6],
      module: {
        id: index + 1, // Generate a unique ID for the module or change according to your data
        moduleCode: item[0],
        moduleName: item[1],
      },
      time: parseTime(item[3]), // Assuming item[3] is in "HH:MM:SS"
      day: item[2],
      venue: item[4],
      type: item[5], // Ensure this matches the EventType type
    }));
  }

  // Convert the API response data to TimetableSlot[]
  const timetableSlots: TimetableSlot[] = convertToTimetableSlots(
    response.data
  );

  return timetableSlots;
};
