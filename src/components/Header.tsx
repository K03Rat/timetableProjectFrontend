// Header.js
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="app-header">
      <nav>
        <Link to="/courses">
          <button>Courses</button>
        </Link>
        <Link to="/modules">
          <button>Modules</button>
        </Link>
        <Link to="/students">
          <button>Students</button>
        </Link>
        <Link to="/lecturers">
          <button>Lecturers</button>
        </Link>
        <Link to="/timetables">
          <button>Timetables</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
