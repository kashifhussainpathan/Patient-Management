import "./ward.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import WardForm from "./WardForm";
import { fetchWards } from "./wardApi";
import { setShowWardForm } from "./wardSlice";
import { useDispatch, useSelector } from "react-redux";

const WardsList = () => {
  const dispatch = useDispatch();
  const { wards, status } = useSelector(({ wards }) => wards);
  const { showWardForm } = useSelector(({ wards }) => wards);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWards());
    }
  }, [status, dispatch]);

  return (
    <div className="wards">
      {showWardForm && (
        <div className="teacherFormModal">
          <div
            className="overlay"
            onClick={() => dispatch(setShowWardForm(false))}
          ></div>
          <div className="modal">
            <WardForm />
          </div>
        </div>
      )}

      <div>
        <h3>Wards :</h3>
        <ol>
          {status === "loading"
            ? "loading..."
            : wards.map((ward) => {
                const { _id, wardNumber } = ward;
                return (
                  <li key={_id}>
                    <Link to={`/wards/${_id}`} state={ward}>
                      Ward: {wardNumber}
                    </Link>
                  </li>
                );
              })}
        </ol>

        <div>
          <button onClick={() => dispatch(setShowWardForm(true))}>
            Add Ward
          </button>
        </div>
      </div>
    </div>
  );
};

export default WardsList;
