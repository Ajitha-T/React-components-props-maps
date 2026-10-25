
import { useState } from "react";
import "./App.css";

const initialStudents = [
  { id: 1, name: "Ravi", age: 22, course: "MERN Stack", status: "Pending" },
  { id: 2, name: "Meena", age: 21, course: "Python", status: "Completed" },
  { id: 3, name: "Arun", age: 23, course: "Java", status: "Pending" },
  { id: 4, name: "Priya", age: 20, course: "Python", status: "Completed" },
  { id: 5, name: "Kumar", age: 24, course: "MERN Stack" },
  { id: 6, name: "Divya", age: 19, course: "Java", status: "Pending" },
];

function StudentCard({ student }) {
  return (
    <div className="student-card">
      <h3>{student.name}</h3>
      <p>Age: {student.age}</p>
      <p>Course: {student.course}</p>
      <p>
        Status:{" "}
        <span className="status">
          {student.status ?? "Not assigned"}
        </span>
      </p>
    </div>
  );
}

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [filteredStudents, setFilteredStudents] = useState(initialStudents);
  const [activeFilter, setActiveFilter] = useState("All Students");
  const [message, setMessage] = useState("");

  // Display all students
  function showAllStudents() {
    setFilteredStudents(students);
    setActiveFilter("All Students");
    setMessage("Displaying all students.");
  }

  // Update Ravi's status
  function updateRavi() {
    const updated = students.map((student) =>
      student.name === "Ravi"
        ? { ...student, status: "Completed" }
        : student
    );

    setStudents(updated);
    setFilteredStudents(updated);
    setActiveFilter("All Students");
    setMessage("Ravi's status updated to Completed.");
  }

  // Insert Deepak
  function addDeepak() {
    if (students.some((student) => student.name === "Deepak")) {
      setMessage("Deepak is already in the student list.");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: "Deepak",
      age: 22,
      course: "MERN Stack",
      status: "Pending",
    };

    const updated = [...students, newStudent];
    setStudents(updated);
    setFilteredStudents(updated);
    setActiveFilter("All Students");
    setMessage("Deepak was added successfully.");
  }

  // Delete Meena
  function deleteMeena() {
    const updated = students.filter(
      (student) => student.name !== "Meena"
    );

    setStudents(updated);
    setFilteredStudents(updated);
    setActiveFilter("All Students");
    setMessage("Meena was deleted.");
  }

  // Reusable filtering function
  function applyFilter(label, condition) {
    setFilteredStudents(students.filter(condition));
    setActiveFilter(label);
    setMessage(`Filter applied: ${label}`);
  }

  return (
    <div className="app">
      <header>
        <h1>Student Management System</h1>
        <p>React Components, Props & Map</p>
      </header>

      <section className="actions">
        <h2>Student Operations</h2>

        <div className="button-group">
          <button onClick={showAllStudents}>1. Show All</button>
          <button onClick={updateRavi}>2. Update Ravi</button>
          <button onClick={addDeepak}>3. Add Deepak</button>
          <button onClick={deleteMeena}>4. Delete Meena</button>
        </div>
      </section>

      <section className="filters">
        <h2>Filter Students</h2>

        <div className="button-group">
          <button
            onClick={() =>
              applyFilter("Age > 21", (s) => s.age > 21)
            }
          >
            5. Age Greater Than 21
          </button>

          <button
            onClick={() =>
              applyFilter("Age < 22", (s) => s.age < 22)
            }
          >
            6. Age Less Than 22
          </button>

          <button
            onClick={() =>
              applyFilter(
                "MERN Stack or Python",
                (s) => ["MERN Stack", "Python"].includes(s.course)
              )
            }
          >
            7. MERN Stack or Python
          </button>

          <button
            onClick={() =>
              applyFilter(
                "Age > 20 and MERN Stack",
                (s) => s.age > 20 && s.course === "MERN Stack"
              )
            }
          >
            8. Age & Course
          </button>

          <button
            onClick={() =>
              applyFilter(
                "Java or Python",
                (s) => s.course === "Java" || s.course === "Python"
              )
            }
          >
            9. Java or Python
          </button>

          <button
            onClick={() =>
              applyFilter(
                "Status Field Exists",
                (s) => Object.hasOwn(s, "status")
              )
            }
          >
            10. Status Exists
          </button>
        </div>
      </section>

      <section className="students-section">
        <h2>{activeFilter}</h2>
        <p>Total students: {filteredStudents.length}</p>

        {filteredStudents.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <div className="student-list">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        )}

        {message && <p className="message">{message}</p>}
      </section>
    </div>
  );
}

export default App;
