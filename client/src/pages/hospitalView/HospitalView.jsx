import "./hospital.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPatients } from "../../features/patient/patientApi";
import { fetchWards } from "../../features/ward/wardApi";

const HospitalView = () => {
  const dispatch = useDispatch();
  const [totalPatients, setTotalPatients] = useState(0);
  const [occupancyRate, setOccupancyRate] = useState(0);
  const [topPerformingWard, setTopPerformingWard] = useState("");

  const patients = useSelector((state) => state.patients.patients);
  const wards = useSelector((state) => state.wards.wards);

  // Function to calculate occupancy rate for a specific ward
  const calculateOccupancyRateForWard = (ward) => {
    const occupiedBeds = patients.filter((patient) => {
      return patient.ward._id === ward._id;
    }).length;

    return (occupiedBeds / ward.capacity) * 100;
  };

  // Function to find the top-performing ward based on occupancy rate
  const findTopPerformingWard = () => {
    let topWard = null;
    let maxOccupancyRate = 0;

    for (const ward of wards) {
      const occupancyRate = calculateOccupancyRateForWard(ward);

      if (occupancyRate > maxOccupancyRate) {
        topWard = ward;
        maxOccupancyRate = occupancyRate;
      }
    }

    // Set specialization or default message
    setTopPerformingWard(topWard ? topWard.specialization : "No data");
  };

  // Function to calculate the overall occupancy rate
  const calculateOccupancyRate = () => {
    const occupiedBeds = patients.length;
    const totalBeds = wards.reduce((total, ward) => total + ward.capacity, 0);
    const rate = (occupiedBeds / totalBeds) * 100;
    setOccupancyRate(rate);
  };

  useEffect(() => {
    setTotalPatients(patients.length);
    calculateOccupancyRate();
    findTopPerformingWard();
  }, [patients, wards]);

  useEffect(() => {
    if (patients.length === 0 && wards.length === 0) {
      dispatch(fetchPatients());
      dispatch(fetchWards());
    }
  }, [patients, wards]);

  return (
    <div className="hospital">
      <ul>
        <li>Total Patients : {totalPatients}</li>
        <li>Occupancy Rate : {occupancyRate.toFixed(2)}%</li>
        <li>Top-performing Ward : {topPerformingWard}</li>
      </ul>
    </div>
  );
};

export default HospitalView;
