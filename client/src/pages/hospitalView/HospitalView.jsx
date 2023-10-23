import "./hospital.css";
import React from "react";
import { useSelector } from "react-redux";

const HospitalView = () => {
  const patients = useSelector((state) => state.patients.patients);

  return (
    <div className="hospital">
      <ul>
        <li>Total Patients: {patients.length}</li>
        <li>Occupancy Rate: {patients.length}</li>
        <li>Top-performing Ward: {patients.length}</li>
      </ul>
    </div>
  );
};

export default HospitalView;
