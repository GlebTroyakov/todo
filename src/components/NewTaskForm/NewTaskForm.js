import React from "react";
import "./NewTaskForm.css";
import PropTypes from "prop-types";

class NewTaskForm extends React.Component {
  state = {
    textTask: "",
  };

  static defaultProps = {
    textTask: "New task (add text)",
  };

  PropTypes = {
    addTask: PropTypes.func.isRequired,
  };

  textTaskChange = (event) => {
    this.setState({
      textTask: event.target.value,
    });
  };

  onClickEnter = () => {
    this.props.addTask(
      this.state.textTask
        ? this.state.textTask
        : NewTaskForm.defaultProps.textTask
    );

    this.setState({
      textTask: "",
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.textTaskChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              this.onClickEnter();
            }
          }}
          value={this.state.textTask}
        />
      </header>
    );
  }
}

export default NewTaskForm;
