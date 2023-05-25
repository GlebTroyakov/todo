import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Task } from '../Task'

import './TaskList.css'

export function TaskList({ todos, onDeleted, onChange, onCompleteTask, onStartTimer, onPauseTimer, changeTextTask }) {
  const [tasks, setTasks] = useState([])

  const searchTaskIndex = (id) => tasks.findIndex((item) => item[0] === id)

  const deleteTask = (id) => {
    const deleteTaskIndex = searchTaskIndex(id)

    const before = tasks.slice(0, deleteTaskIndex)
    const after = tasks.slice(deleteTaskIndex + 1)

    setTasks({
      tasks: [...before, ...after],
    })
  }

  const saveTask = (nameKey, id) => {
    if (nameKey === 'Enter') {
      const taskIndex = searchTaskIndex(id)
      const task = tasks[taskIndex]
      changeTextTask(task[0], task[1])
      deleteTask(id)
    }
  }

  const addTask = (id, textTask) => {
    setTasks({
      tasks: [...tasks, [id, textTask]],
    })
  }

  const textTaskChange = (id, newTextTask) => {
    const newTaskIndex = searchTaskIndex(id)
    const newTask = tasks[newTaskIndex]
    newTask[1] = newTextTask

    const before = tasks.slice(0, newTaskIndex)
    const after = tasks.slice(newTaskIndex + 1)

    setTasks({
      tasks: [...before, newTask, ...after],
    })
  }

  const returnTextTask = (id) => {
    const taskIndex = searchTaskIndex(id)
    const task = tasks[taskIndex]
    return task[1]
  }

  const items = todos.map((item) => {
    const { id, textTask, completed, timeCreated, edit, timeSeconds, runTimer } = item
    let liClassNames = ''
    if (completed) {
      liClassNames = 'completed'
    }
    if (edit) {
      liClassNames = 'editing'
    }

    return (
      <li className={liClassNames} key={id}>
        <Task
          textTask={textTask}
          completed={completed}
          timeCreated={timeCreated}
          edit={edit}
          timeSeconds={timeSeconds}
          runTimer={runTimer}
          onDeleted={() => onDeleted(id)}
          onChange={() => {
            onChange(id)
            addTask(id, item.textTask)
          }}
          onCompleteTask={() => onCompleteTask(id)}
          onStartTimer={() => onStartTimer(id)}
          onPauseTimer={() => onPauseTimer(id)}
          id={id}
        />
        {liClassNames === 'editing' && (
          <input
            type="text"
            className="edit"
            onChange={(event) => {
              textTaskChange(id, event.target.value)
            }}
            onKeyDown={(event) => {
              saveTask(event.key, id)
            }}
            value={returnTextTask(id)}
            maxLength={10}
          />
        )}
      </li>
    )
  })

  return <ul className="todo-list">{items}</ul>
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      textTask: PropTypes.string,
      id: PropTypes.string,
      completed: PropTypes.bool,
      edit: PropTypes.bool,
      timeCreated: PropTypes.instanceOf(Date),
      timeSeconds: PropTypes.number,
      startTimer: PropTypes.bool,
    })
  ).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onCompleteTask: PropTypes.func.isRequired,
  onStartTimer: PropTypes.func.isRequired,
  onPauseTimer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}
