import React from 'react'
import './NewTaskForm.css'
import PropTypes from 'prop-types'

class NewTaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textTask: '',
    }
  }

  textTaskChange = (event) => {
    this.setState({
      textTask: event.target.value,
    })
  }

  onClickEnter = () => {
    const { addTask } = this.props
    const { textTask } = this.state

    addTask(textTask)

    this.setState({
      textTask: '',
    })
  }

  render() {
    const { textTask } = this.state

    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.textTaskChange}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              this.onClickEnter()
            }
          }}
          value={textTask}
        />
      </header>
    )
  }
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
}

export default NewTaskForm
