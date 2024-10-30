import "./App.css";
import CourseList from "./components/CourseList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TimetableSlotList from "./components/TimetableStlotList";
import ModuleList from "./components/ModuleList";
import StudentList from "./components/studentList";
import LecturerList from "./components/LecturerList";
import CourseTimetable from "./components/CourseTimetable";
import Header from "./components/Header"; // Import the Header component

function App() {
  return (
    <Router>
      <Header /> {/* Include the Header component */}
      <Routes>
        <Route path="/timetables" element={<TimetableSlotList />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/modules" element={<ModuleList />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/lecturers" element={<LecturerList />} />
        <Route path="/timetableFor" element={<CourseTimetable />} />
      </Routes>
    </Router>
  );
}

export default App;
