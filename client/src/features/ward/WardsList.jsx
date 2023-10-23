import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import WardForm from "./WardForm";
import { fetchWards } from "./wardApi";
import { setShowWardForm } from "./wardSlice";
import { useDispatch, useSelector } from "react-redux";

const WardsList = () => {
  const dispatch = useDispatch();
  const wards = useSelector((state) => state.wards.wards);
  const { showWardForm } = useSelector(({ wards }) => wards);

  useEffect(() => {
    dispatch(fetchWards());
  }, []);

  return (
    <div>
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

      {wards.map((ward) => {
        const { _id, wardNumber } = ward;
        return (
          <div key={_id}>
            <Link to={`/wards/${_id}`} state={ward}>
              <h3>Ward: {wardNumber}</h3>
            </Link>
          </div>
        );
      })}

      <div>
        <button onClick={() => dispatch(setShowWardForm(true))}>
          Add Ward
        </button>
      </div>
    </div>
  );
};

export default WardsList;
