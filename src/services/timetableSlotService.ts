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
    console.log(response.data);

    return normalizedSlots;
  } catch (error) {
    console.error("Error fetching timetable slots:", error);
    throw new Error("Failed to fetch timetable slots"); // Optionally re-throw the error
  }
};
export const deleteTimetableSlot = async (timetableSlotId: number) => {
  try {
    const response = await apiClient.delete(`/timetables/${timetableSlotId}`);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
// Function to create a new timetable slot
export const createTimetableSlot = async (timetableSlot: TimetableSlot) => {
  try {
    // Format time correctly with leading zeros for hours and minutes
    const formattedHours =
      timetableSlot.time.hours < 10
        ? `0${timetableSlot.time.hours}`
        : timetableSlot.time.hours;
    const formattedMinutes =
      timetableSlot.time.minutes < 10
        ? `0${timetableSlot.time.minutes}`
        : timetableSlot.time.minutes;
    const startTime = `${formattedHours}:${formattedMinutes}:00`; // Ensure startTime is HH:MM:00

    // Prepare data for the API request
    const data = {
      semester: timetableSlot.semester,
      startTime, // Use formatted start time
      dayOfWeek: timetableSlot.day,
      venue: timetableSlot.venue, // Ensure the venue is correctly referenced
      type: timetableSlot.type, // Slot type (e.g., lecture, tutorial, lab)
      module: timetableSlot.module, // Module details
    };

    // Log the data that will be sent to the server
    console.log("Creating timetable slot with data:", data);

    // Make API request to create the timetable slot
    const response = await apiClient.post("/timetables", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Log the successful response data
    console.log("Timetable slot created successfully:", response.data);
    return response.data; // Return response data for further processing if needed
  } catch (error) {
    // Improved error handling with a clear message
    console.error(
      "Error creating timetable slot:",
      error.response?.data || error.message || error
    );
    throw error; // Re-throw the error if you need to handle it further up
  }
};

// Function to update an existing timetable slot
export const updateTimetableSlot = async (timetableSlot: TimetableSlot) => {
  try {
    // Format time correctly with leading zeros for hours and minutes
    const formattedHours =
      timetableSlot.time.hours < 10
        ? `0${timetableSlot.time.hours}`
        : timetableSlot.time.hours;
    const formattedMinutes =
      timetableSlot.time.minutes < 10
        ? `0${timetableSlot.time.minutes}`
        : timetableSlot.time.minutes;
    const startTime = `${formattedHours}:${formattedMinutes}:00`; // Ensure startTime is HH:MM:00

    // Prepare data for the API request
    const data = {
      semester: timetableSlot.semester,
      startTime, // Use formatted start time
      dayOfWeek: timetableSlot.day,
      venue: timetableSlot.venue, // Ensure the venue is correctly referenced
      type: timetableSlot.type, // Slot type (e.g., lecture, tutorial, lab)
      module: timetableSlot.module, // Module details
    };

    // Log the data that will be sent to the server
    console.log("Creating timetable slot with id:", timetableSlot.id);
    console.log("Creating timetable slot with data:", data);

    // Make API request to create the timetable slot
    const response = await apiClient.put(
      `/timetables/${timetableSlot.id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // Log the successful response
    console.log("Timetable slot updated successfully:", response.data);
    return response.data; // Return the updated data if needed
  } catch (error) {
    // Improved error handling
    console.error(
      "Error updating timetable slot:",
      error.response?.data || error.message || error
    );
    throw error; // Re-throw the error for higher-level handling
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
