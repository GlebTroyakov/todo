import React from "react";
import TaskFilter from "../TaskFilter";
import "./Footer.css";
import PropTypes from "prop-types";

class Footer extends React.Component {
  PropTypes = {
    changeTaskList: PropTypes.func.isRequired,
    parameterTask: PropTypes.string.isRequired,
    deleteCompleted: PropTypes.func.isRequired,
    countNoCompletedTasks: PropTypes.number,
  };

  static defaultProps = {
    countNoCompletedTasks: "no counter",
  };

  render() {
    const {
      changeTaskList,
      parameterTask,
      deleteCompleted,
      countNoCompletedTasks,
    } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{countNoCompletedTasks}</span>
        <TaskFilter
          changeTaskList={changeTaskList}
          parameterTask={parameterTask}
        />
        <button className="clear-completed" onClick={deleteCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}

export default Footer;
