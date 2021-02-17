import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProjectTask } from "../../../actions/backlogActions";

const UpdateProjectTask = () => {
  const dispatch = useDispatch();
  const { backlog_id, pt_id } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(getProjectTask(backlog_id, pt_id, history));
  }, []);

  return (
    <div>
      <h1>Update Project Task Form</h1>
    </div>
  );
};

export default UpdateProjectTask;
