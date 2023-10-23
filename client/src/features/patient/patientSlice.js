import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPatients,
  addPatientAsync,
  updatePatientAsync,
  deletePatientAsync,
} from "./patientApi";

const initialState = {
  patients: [],
  status: "idle",
  error: null,
  showPatientForm: false,
};

const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setShowPatientForm: (state, action) => {
      state.showPatientForm = action.payload;
    },
  },
  extraReducers: {
    [fetchPatients.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPatients.fulfilled]: (state, action) => {
      state.status = "success";
      state.patients = action.payload;
    },
    [fetchPatients.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addPatientAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addPatientAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.patients = action.payload;
    },
    [addPatientAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updatePatientAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updatePatientAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedPatients = action.payload;
      state.patients = updatedPatients;
    },
    [updatePatientAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deletePatientAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deletePatientAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.patients = state.patients.filter(
        (patient) => patient._id !== action.payload._id
      );
    },
    [deletePatientAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export const { setShowPatientForm } = patientsSlice.actions;

export default patientsSlice.reducer;
