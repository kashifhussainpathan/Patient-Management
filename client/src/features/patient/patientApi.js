import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://patient-management-vd6y.onrender.com/patients";

const fetchPatients = createAsyncThunk("patients/fetchPatients", async () => {
  const response = await axios.get(API_URL);
  return response.data.patients;
});

const addPatientAsync = createAsyncThunk(
  "patients/addPatientAsync",
  async (newPatient) => {
    const response = await axios.post(API_URL, newPatient);
    return response.data.patients;
  }
);

const updatePatientAsync = createAsyncThunk(
  "patients/updatePatientAsync",
  async ({ id, updatedPatient }) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedPatient);
    return response.data.patients;
  }
);

const deletePatientAsync = createAsyncThunk(
  "patients/deletePatientAsync",
  async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data.patients;
  }
);

export {
  fetchPatients,
  addPatientAsync,
  updatePatientAsync,
  deletePatientAsync,
};
