const express = require("express");

const {
  getAllPatients,
  addPatient,
  getPatient,
  editPatient,
  deletePatient,
} = require("../controllers/patient.controller");

const patientRouter = express.Router();

patientRouter.get("/", async (req, res) => {
  try {
    const allPatients = await getAllPatients();
    res.status(201).json({
      message: "All patients fetched successfully",
      patients: allPatients,
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch all patients" });
  }
});

patientRouter.post("/", async (req, res) => {
  try {
    const patients = await addPatient(req.body);

    if (patients.length >= 0) {
      res.status(200).json({
        message: "New patient added successfully",
        patients,
      });
    } else {
      res.status(404).json({ error: "Error adding new patient" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to add new patient" });
  }
});

patientRouter.get("/:patientName", async (req, res) => {
  try {
    const selectedPatient = await getPatient(req.params.patientName);
    if (selectedPatient) {
      res.status(200).json({
        message: "Patient fetched successfully",
        patient: selectedPatient,
      });
    } else {
      res.status(404).json({ error: "Patient not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch patient", error });
  }
});

patientRouter.put("/:patientId", async (req, res) => {
  try {
    const patients = await editPatient(req.params.patientId, req.body);
    if (patients.length >= 0) {
      res.status(201).json({
        message: "Patient updated successfully",
        patients,
      });
    } else {
      res.status(404).json({ error: "Patient not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to update patient", error });
  }
});

patientRouter.delete("/:patientId", async (req, res) => {
  try {
    console.log(req.params.patientId);
    const patients = await deletePatient(req.params.patientId);
    if (patients.length >= 0) {
      res.status(200).json({
        message: "Patient deleted successfully",
        patients,
      });
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to delete patient", error });
  }
});

module.exports = patientRouter;
