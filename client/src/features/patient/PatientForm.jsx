import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addPatientAsync, updatePatientAsync } from "./patientApi";

const PatientForm = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { wards } = useSelector(({ wards }) => wards);
  const patients = useSelector((state) => state.patients.patients);

  const patient = state ? state : null;

  const allGenders = ["Male", "Female", "Non-binary"];

  const [patientInfo, setPatientInfo] = useState({
    name: patient ? patient.name : "",
    age: patient ? patient.age : "",
    gender: patient ? patient.gender : "",
    medicalHistory: patient ? patient.medicalHistory : "",
    contact: patient ? patient.contact : "",
    ward: patient ? patient.ward._id : "",
  });

  const handlePatientInputChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo({ ...patientInfo, [name]: value });
  };

  const handlePatientSubmit = (e) => {
    e.preventDefault();
    if (patient) {
      dispatch(
        updatePatientAsync({
          id: patient._id,
          updatedPatient: patientInfo,
        })
      );
    } else {
      dispatch(
        addPatientAsync({
          ...patientInfo,
          ward: patientInfo.ward ? patientInfo.ward : wards[0]._id,
        })
      );
    }
  };

  return (
    <div>
      <form onSubmit={handlePatientSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Patient Name"
          value={patientInfo.name}
          onChange={handlePatientInputChange}
        />

        <label>Age:</label>
        <input
          type="number"
          name="age"
          min={0}
          placeholder="age"
          value={patientInfo.age}
          onChange={handlePatientInputChange}
        />

        <label>Gender:</label>
        {allGenders.map((gender) => (
          <div key={gender}>
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={
                patientInfo.gender &&
                patientInfo.gender.toLowerCase() === gender.toLowerCase()
              }
              onChange={handlePatientInputChange}
            />
            {gender}
          </div>
        ))}

        <label>Medical History:</label>
        <textarea
          name="medicalHistory"
          placeholder="Medical History"
          value={patientInfo.medicalHistory}
          onChange={handlePatientInputChange}
        />

        <label>Contact:</label>
        <input
          type="number"
          name="contact"
          placeholder="Contact Information"
          value={patientInfo.contact}
          onChange={handlePatientInputChange}
        />

        <label>Ward: </label>
        <select
          onChange={handlePatientInputChange}
          value={patientInfo.ward}
          name="ward"
        >
          {wards.map(({ _id, wardNumber, specialization }) => (
            <option value={_id} key={_id}>
              {wardNumber} - {specialization}
            </option>
          ))}
        </select>

        <button type="submit">
          {patient ? "Edit Patient" : "Add Patient"}
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
