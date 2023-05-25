import React, { useState } from 'react'
import './NewTaskForm.css'
import PropTypes from 'prop-types'

export function NewTaskForm({ addTask }) {
  const [text, setText] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const validateTimeValue = (time) => {
    let result = true
    time.split('').forEach((el) => {
      if (Number.isNaN(+el)) {
        result = false
      }
    })
    return result
  }

  const textTaskChange = (event) => {
    setText(event.target.value)
  }

  const onChangeMinutes = (event) => {
    if (validateTimeValue(event.target.value) && event.target.value < 60) {
      setMin(event.target.value)
    }
  }

  const onChangeSeconds = (event) => {
    if (validateTimeValue(event.target.value) && event.target.value < 60) {
      setSec(event.target.value)
    }
  }

  const onSubmitTask = () => {
    let resultSeconds = 0

    if (sec) {
      resultSeconds += Number(sec)
    }

    if (min) {
      resultSeconds += Number(min * 60)
    }

    addTask(text, resultSeconds)

    setText('')
    setMin('')
    setSec('')
  }

  const onClickEnter = (event) => {
    if (event.key === 'Enter') {
      if (text) {
        onSubmitTask()
      }
    }
  }

  return (
    <header className="header">
      <h1>todo</h1>
      <form className="new-todo-form" style={{ display: 'flex' }}>
        <input
          className="new-todo"
          placeholder="Task"
          value={text}
          onChange={textTaskChange}
          style={{ width: '70%' }}
          maxLength={10}
          required
          onKeyDown={onClickEnter}
        />
        <input
          className="new-todo new-todo-form__timer"
          placeholder="Min"
          value={min}
          onChange={onChangeMinutes}
          style={{ width: '15%', padding: '0' }}
          onKeyDown={onClickEnter}
          maxLength={2}
        />
        <input
          className="new-todo new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          onChange={onChangeSeconds}
          style={{ width: '15%', padding: '0' }}
          onKeyDown={onClickEnter}
          maxLength={2}
        />
        <input type="submit" hidden />
      </form>
    </header>
  )
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
}
