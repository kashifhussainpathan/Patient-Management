import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import WardsList from "./features/ward/WardsList";
import WardDetails from "./features/ward/WardDetails";
import PatientsList from "./features/patient/PatientsList";
import HospitalView from "./pages/hospitalView/HospitalView";
import PatientDetails from "./features/patient/PatientDetails";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wards" element={<WardsList />} />
        <Route path="/hospital" element={<HospitalView />} />
        <Route path="/patients" element={<PatientsList />} />
        <Route path="/wards/:wardId" element={<WardDetails />} />
        <Route path="/patients/:patientId" element={<PatientDetails />} />
      </Routes>
    </>
  );
}

export default App;
