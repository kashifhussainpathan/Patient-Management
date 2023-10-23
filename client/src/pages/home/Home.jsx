import "./home.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWards } from "../../features/ward/wardApi";
import { fetchPatients } from "../../features/patient/patientApi";

const Home = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.patients.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPatients());
      dispatch(fetchWards());
    }
  }, [status, dispatch]);

  return (
    <div className="home">
      <h1>Welcome to NeoG Hospital.</h1>
    </div>
  );
};

export default Home;
