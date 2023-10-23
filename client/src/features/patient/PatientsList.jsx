import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import PatientForm from "./PatientForm";
import { fetchPatients } from "./patientApi";
import { fetchWards } from "../ward/wardApi";
import { useDispatch, useSelector } from "react-redux";
import { setShowPatientForm } from "./patientSlice";

const PatientsList = () => {
  const dispatch = useDispatch();
  const { wards } = useSelector(({ wards }) => wards);
  const { patients } = useSelector(({ patients }) => patients);
  const { showPatientForm } = useSelector(({ patients }) => patients);

  useEffect(() => {
    if (patients.length <= 0 && patients.length <= 0) {
      dispatch(fetchPatients());
      dispatch(fetchWards());
    }
  }, [wards, patients]);

  return (
    <div>
      {patients.map((patient) => {
        const { _id, name } = patient;
        return (
          <div key={_id}>
            <Link to={`/patients/${_id}`} state={patient}>
              <h2>{name}</h2>
            </Link>
          </div>
        );
      })}

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

      <div>
        <button onClick={() => dispatch(setShowPatientForm(true))}>
          Add Patient
        </button>
      </div>
    </div>
  );
};

export default PatientsList;
