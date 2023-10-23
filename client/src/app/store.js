import { configureStore } from "@reduxjs/toolkit";
import wardReducer from "../features/ward/wardSlice";
import patientsReducer from "../features/patient/patientSlice";

const store = configureStore({
  reducer: {
    wards: wardReducer,
    patients: patientsReducer,
  },
});

export default store;
