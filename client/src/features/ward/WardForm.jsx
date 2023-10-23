import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addWardAsync, updateWardAsync } from "./wardApi";
import { setShowWardForm } from "./wardSlice";

const WardForm = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();

  const ward = state ? state : null;

  const wards = useSelector((state) => state.wards.wards);

  const allSpecializations = [
    "General Ward",
    "Emergency Ward",
    "Intensive Care Unit",
    "Intensive Coronary Care Unit",
    "Nursery",
    "Special Septic Nursery",
    "Burns Ward",
    "Postoperative Ward",
    "Postnatal Ward",
  ];

  const [wardInfo, setWardInfo] = useState({
    wardNumber: ward ? ward.wardNumber : 0,
    capacity: ward ? ward.capacity : 0,
    specialization: ward ? ward.specialization : allSpecializations[0],
  });

  const handleWardInputChange = (e) => {
    const { name, value } = e.target;
    setWardInfo({ ...wardInfo, [name]: value });
  };

  const handleWardSubmit = (e) => {
    e.preventDefault();
    if (ward) {
      dispatch(updateWardAsync({ id: ward._id, updatedWard: wardInfo }));
      dispatch(setShowWardForm(false));
    } else {
      dispatch(addWardAsync(wardInfo));
      dispatch(setShowWardForm(false));
    }
  };

  return (
    <div>
      <form onSubmit={handleWardSubmit}>
        <label>Ward Number:</label>
        <input
          type="number"
          name="wardNumber"
          placeholder="Ward Number"
          value={wardInfo.wardNumber}
          onChange={handleWardInputChange}
        />

        <label>Capacity:</label>
        <input
          type="number"
          name="capacity"
          placeholder="Ward capacity"
          value={wardInfo.capacity}
          onChange={handleWardInputChange}
        />

        <label>Specialization:</label>
        <select
          onChange={handleWardInputChange}
          value={wardInfo.specialization}
          name="specialization"
        >
          {allSpecializations.map((specialization) => (
            <option value={specialization} key={specialization}>
              {specialization}
            </option>
          ))}
        </select>

        <button type="submit">{ward ? "Edit Ward" : "Add Ward"}</button>
      </form>
    </div>
  );
};

export default WardForm;
