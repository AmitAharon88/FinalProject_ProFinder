import {Routes, Route} from "react-router-dom";
import Tutors from "./components/Tutors";
import Tutor from "./components/Tutor";
import Register from "./components/Register";
import TutorRegister from "./components/TutorRegister";
import StudentRegister from "./components/StudentRegister";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  return (
    <div className="App">
     <Nav />
      <Routes>
          <Route path="/" element={<Tutors />} />
          <Route path="/:id" element={<Tutor />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/tutor" element={<TutorRegister />} />
          <Route path="/register/student" element={<StudentRegister />} />
        </Routes>
    </div>
  );
}

export default App;
