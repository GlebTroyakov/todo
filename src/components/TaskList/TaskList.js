import React from 'react'
import PropTypes from 'prop-types'

import { Task } from '../Task'

import './TaskList.css'

class TaskList extends React.Component {
  state = {
    tasks: [],
  }

  saveTask = (nameKey, id) => {
    if (nameKey === 'Enter') {
      const taskIndex = this.searchTaskIndex(id)
      const task = this.state.tasks[taskIndex]
      this.props.changeTextTask(task[0], task[1])
      this.deleteTask(id)
    }
  }

  addTask = (id, textTask) => {
    const { tasks } = this.state

    this.setState({
      tasks: [...tasks, [id, textTask]],
    })
  }

  textTaskChange = (id, newTextTask) => {
    const newTaskIndex = this.searchTaskIndex(id)
    const newTask = this.state.tasks[newTaskIndex]
    newTask[1] = newTextTask

    const before = this.state.tasks.slice(0, newTaskIndex)
    const after = this.state.tasks.slice(newTaskIndex + 1)

    this.setState({
      tasks: [...before, newTask, ...after],
    })
  }

  searchTaskIndex = (id) => this.state.tasks.findIndex((item) => item[0] === id)

  deleteTask = (id) => {
    const deleteTaskIndex = this.searchTaskIndex(id)

    const before = this.state.tasks.slice(0, deleteTaskIndex)
    const after = this.state.tasks.slice(deleteTaskIndex + 1)

    this.setState({
      tasks: [...before, ...after],
    })
  }

  returnTextTask = (id) => {
    const taskIndex = this.searchTaskIndex(id)
    const task = this.state.tasks[taskIndex]
    return task[1]
  }

  render() {
    const { todos, onDeleted, onChange, onCompleteTask } = this.props
    const items = todos.map((item) => {
      const { id, textTask, completed, timeCreated, edit } = item
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
            onDeleted={() => onDeleted(id)}
            onChange={() => {
              onChange(id)
              this.addTask(id, item.textTask)
            }}
            onCompleteTask={() => onCompleteTask(id)}
          />
          {liClassNames === 'editing' && (
            <input
              type="text"
              className="edit"
              onChange={(event) => {
                this.textTaskChange(id, event.target.value)
              }}
              onKeyDown={(event) => {
                this.saveTask(event.key, id)
              }}
              value={this.returnTextTask(id)}
            />
          )}
        </li>
      )
    })

    return <ul className="todo-list">{items}</ul>
  }
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      textTask: PropTypes.string,
      completed: PropTypes.bool,
      edit: PropTypes.bool,
    })
  ).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onCompleteTask: PropTypes.func.isRequired,
}

export { TaskList }
