import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import "./Task.css";
import PropTypes from "prop-types";

class Task extends React.Component {
  PropTypes = {
    textTask: PropTypes.string.isRequired,
    onDeleted: PropTypes.func.isRequired,
    onCompleteTask: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
  };

  render() {
    const {
      textTask,
      onDeleted,
      onChange,
      onCompleteTask,
      completed,
      timeCreated,
    } = this.props;

    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed ? true : false}
          onChange={onCompleteTask}
        ></input>
        <label>
          <span className="description" onClick={onCompleteTask}>
            {textTask}
          </span>
          <span className="created">
            {`created ${formatDistanceToNow(timeCreated, {
              includeSeconds: true,
            })} ago`}
          </span>
        </label>
        <button className="icon icon-edit" onClick={onChange}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    );
  }
}

export default Task;
