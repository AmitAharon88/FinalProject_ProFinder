import {Routes, Route} from "react-router-dom";
import {useState, createContext} from 'react';
import Tutors from "./components/Tutors";
import Tutor from "./components/Tutor";
import Register from "./components/Register";
import TutorRegister from "./components/TutorRegister";
import StudentRegister from "./components/StudentRegister";
import SignIn from "./components/SignIn";
import Nav from "./components/Nav";
// import Footer from "./components/Footer";
import "./App.css";

export const AppContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userFN, setUserFN] = useState("");
  const [studentId, setStudentId] = useState("");
  const [userRole, setUserRole] = useState("");

  return (
    <div className="App">
      <AppContext.Provider value={{isAuthenticated, setIsAuthenticated, userFN, setUserFN, studentId, setStudentId, userRole, setUserRole}}>
        <Nav />
        <Routes>
            <Route path="/" element={<Tutors />} />
            <Route path="/:id" element={<Tutor />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/tutor" element={<TutorRegister />} />
            <Route path="/register/student" element={<StudentRegister />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </AppContext.Provider>
    </div>
  );
}

export default App;
