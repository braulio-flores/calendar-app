import React from "react";
import { useDispatch } from "react-redux";
import { eventDeleted } from "../../actions/event";

const DeletEventFfab = () => {
  const dispatch = useDispatch();

  const handleClickDelete = () => {
    dispatch(eventDeleted());
  };

  return (
    <button className="btn btn-danger fab-danger" onClick={handleClickDelete}>
      <i className="fas fa-trash"></i>
      <span> Delete Event</span>
    </button>
  );
};

export default DeletEventFfab;
