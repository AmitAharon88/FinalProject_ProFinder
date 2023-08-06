import {Routes, Route} from "react-router-dom";
import Tutors from "./components/Tutors";
import Tutor from "./components/Tutor";
import TutorRegister from "./components/TutorRegister";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
          <Route path="/" element={<Tutors />} />
          <Route path="/:id" element={<Tutor />} />
          <Route path="/register" element={<TutorRegister />} />
        </Routes>
    </div>
  );
}

export default App;
