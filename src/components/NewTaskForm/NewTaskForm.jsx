import React from 'react'
import './NewTaskForm.css'
import PropTypes from 'prop-types'

class NewTaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textTask: '',
      min: '',
      sec: '',
    }
  }

  validateTimeValue = (time) => {
    let result = true
    time.split('').forEach((el) => {
      if (Number.isNaN(+el)) {
        result = false
      }
    })
    return result
  }

  textTaskChange = (event) => {
    this.setState({
      textTask: event.target.value,
    })
  }

  onChangeMinutes = (event) => {
    if (this.validateTimeValue(event.target.value) && event.target.value < 60) {
      this.setState({
        min: event.target.value,
      })
    }
  }

  onChangeSeconds = (event) => {
    if (this.validateTimeValue(event.target.value) && event.target.value < 60) {
      this.setState({
        sec: event.target.value,
      })
    }
  }

  onClickEnter = (event) => {
    if (event.key === 'Enter') {
      const { textTask } = this.state
      if (textTask) {
        this.onSubmitTask()
      }
    }
  }

  onSubmitTask = () => {
    const { addTask } = this.props
    const { textTask, sec, min } = this.state

    let resultSeconds = 0

    if (sec) {
      resultSeconds += Number(sec)
    }

    if (min) {
      resultSeconds += Number(min * 60)
    }

    addTask(textTask, resultSeconds)

    this.setState({
      textTask: '',
      min: '',
      sec: '',
    })
  }

  render() {
    const { textTask, sec, min } = this.state

    return (
      <header className="header">
        <h1>todo</h1>
        <form className="new-todo-form" style={{ display: 'flex' }}>
          <input
            className="new-todo"
            placeholder="Task"
            value={textTask}
            onChange={this.textTaskChange}
            style={{ width: '70%' }}
            maxLength={7}
            required
            onKeyDown={this.onClickEnter}
          />
          <input
            className="new-todo new-todo-form__timer"
            placeholder="Min"
            value={min}
            onChange={this.onChangeMinutes}
            style={{ width: '15%', padding: '0' }}
            onKeyDown={this.onClickEnter}
            maxLength={2}
          />
          <input
            className="new-todo new-todo-form__timer"
            placeholder="Sec"
            value={sec}
            onChange={this.onChangeSeconds}
            style={{ width: '15%', padding: '0' }}
            onKeyDown={this.onClickEnter}
            maxLength={2}
          />
          <input type="submit" hidden />
        </form>
      </header>
    )
  }
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
}

export { NewTaskForm }
