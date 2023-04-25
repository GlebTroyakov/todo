import React from "react";
import "./TaskFilter.css";
import PropTypes from "prop-types";

class TaskFilter extends React.Component {
  PropTypes = {
    changeTaskList: PropTypes.array.isRequired,
    parameterTask: PropTypes.string,
  };

  addButton = (textButton) => {
    return (
      <button
        className={textButton === this.props.parameterTask ? "selected" : ""}
        onClick={(event) => {
          this.props.changeTaskList(event.target.textContent);
        }}
      >
        {textButton}
      </button>
    );
  };

  render() {
    return (
      <ul className="filters">
        <li>{this.addButton("All")}</li>
        <li>{this.addButton("Active")}</li>
        <li>{this.addButton("Completed")}</li>
      </ul>
    );
  }
}

export default TaskFilter;
