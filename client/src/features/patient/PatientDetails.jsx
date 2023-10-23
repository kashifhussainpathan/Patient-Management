import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import PatientForm from "./PatientForm";
import { deletePatientAsync } from "./patientApi";
import { useDispatch, useSelector } from "react-redux";
import { setShowPatientForm } from "./patientSlice";

const PatientDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { patientId } = useParams();
  const { showPatientForm } = useSelector(({ patients }) => patients);

  const patient = useSelector((state) =>
    state.patients.patients?.find(({ _id }) => _id === patientId)
  );

  const handleDeletePatient = () => {
    dispatch(deletePatientAsync(patient._id));
    navigate("/patients");
  };

  if (!patient) {
    return <p>Patient not found!</p>;
  }

  return (
    <div>
      <ul>
        <li>
          Name: <span>{patient.name}</span>
        </li>
        <li>
          Age: <span>{patient.age}</span>
        </li>
        <li>
          Gender: <span>{patient.gender}</span>
        </li>
        <li>
          Medical History: <span>{patient.medicalHistory.join(", ")}</span>
        </li>
        <li>
          Contact: <span>{patient.contact}</span>
        </li>
        <li>
          Ward Number: <span>{patient.ward.wardNumber}</span>
        </li>
      </ul>

      {showPatientForm && (
        <div className="teacherFormModal">
          <div
            className="overlay"
            onClick={() => dispatch(setShowPatientForm(false))}
          ></div>
          <div className="modal">
            <PatientForm />
          </div>
        </div>
      )}

      <button onClick={() => dispatch(setShowPatientForm(true))}>
        Edit Patient
      </button>

      <button onClick={handleDeletePatient}>Delete</button>

      <Link to="/patients">Go Back</Link>
    </div>
  );
};

export default PatientDetails;
