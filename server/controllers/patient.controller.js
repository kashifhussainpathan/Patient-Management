const mongoose = require("mongoose");
const fs = require("fs");

const jsonData = fs.readFileSync("./data/patient.json");
const patientData = JSON.parse(jsonData);

const Patient = require("../models/patient.model");

const seedPatientDatabase = async () => {
  try {
    for (const patient of patientData) {
      const newPatient = new Patient(patient);
      await newPatient.save();
      console.log(`Patient ${newPatient.name} seeded`);
    }
    console.log("Patient database seeded successfully");
  } catch (error) {
    console.log("Error seeding patient database:", error);
  } finally {
    mongoose.disconnect();
  }
};

const getAllPatients = async () => {
  try {
    const allPatients = await Patient.find().populate({
      path: "ward",
      select: "wardNumber capacity specialization",
    });
    console.log("All patients:", allPatients);
    return allPatients;
  } catch (error) {
    console.log("Error fetching all patients:", error);
  }
};

const addPatient = async (patient) => {
  try {
    const newPatient = new Patient(patient);
    const populatedPatient = await newPatient.populate({
      path: "ward",
      select: "wardNumber capacity specialization",
    });
    const addedPatient = await populatedPatient.save();
    if (addedPatient) {
      const patients = getAllPatients();
      console.log("New patient added successfully:", addedPatient);
      return patients;
    } else {
      console.log("Unable to add new patient");
    }
  } catch (error) {
    console.log("Error adding new patient:", error);
  }
};

const editPatient = async (patientId, patient) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(patientId, patient, {
      new: true,
    }).populate({
      path: "ward",
      select: "wardNumber capacity specialization",
    });
    if (updatedPatient) {
      const patients = getAllPatients();
      console.log("Patient updated successfully:", updatedPatient);
      return patients;
    } else {
      console.log("Unable to update patient");
    }
  } catch (error) {
    console.log("Error updating patient:", error);
  }
};

const deletePatient = async (patientId) => {
  try {
    console.log(patientId);
    const deletedPatient = await Patient.findByIdAndDelete({ _id: patientId });
    if (deletedPatient) {
      const patients = getAllPatients();
      console.log("Patient deleted successfully:", deletedPatient);
      return patients;
    } else {
      console.log("Unable to delete patient");
    }
  } catch (error) {
    console.log("Error deleting patient:", error);
  }
};

const getPatient = async (patientName) => {
  try {
    const selectedPatient = await Patient.findOne({ name: patientName });
    if (selectedPatient) {
      console.log("Patient fetched successfully:", selectedPatient);
      return selectedPatient;
    } else {
      console.log("Unable to fetch patient");
    }
  } catch (error) {
    console.log("Error fetching patient:", error);
  }
};

module.exports = {
  seedPatientDatabase,
  getAllPatients,
  addPatient,
  editPatient,
  deletePatient,
  getPatient,
};
