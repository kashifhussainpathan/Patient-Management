import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import WardForm from "./WardForm";
import { setShowWardForm } from "./wardSlice";
import { deleteWardAsync } from "./wardApi";

const WardDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wardId } = useParams();
  const { showWardForm } = useSelector(({ wards }) => wards);

  const ward = useSelector((state) =>
    state.wards.wards?.find(({ _id }) => _id === wardId)
  );

  const handleDeleteWard = () => {
    dispatch(deleteWardAsync(ward._id));
    navigate("/wards");
  };

  if (!ward) {
    return <p>Ward not found!</p>;
  }

  return (
    <div>
      <ul>
        <li>
          Ward Number: <span>{ward.wardNumber}</span>
        </li>
        <li>
          Capacity: <span>{ward.capacity} patients</span>
        </li>
        <li>
          specialization: <span>{ward.specialization}</span>
        </li>
      </ul>

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
        <button onClick={() => dispatch(setShowWardForm(true))}>
          Edit Ward
        </button>

        <button onClick={handleDeleteWard}>Delete</button>
        <Link to="/wards">Go Back</Link>
      </div>
    </div>
  );
};

export default WardDetails;
