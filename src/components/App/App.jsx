import React from 'react'
import { nanoid } from 'nanoid'

import { TaskList } from '../TaskList'
import { Footer } from '../Footer'
import { NewTaskForm } from '../NewTaskForm'
import './App.css'

class App extends React.Component {
  state = {
    todoData: [this.createTask('Learn Web Core'), this.createTask('Learn JavaScript'), this.createTask('Learn React')],
    parameterTask: 'All',
  }

  searchTask = (id) => {
    /* 
    search task in state by id

    return array of:
    desiredTask - this task,
    desiredTaskIndex - index of this task,
    before - array of tasks before this task
    after - array of tasks after this task 
    */

    const desiredTaskIndex = this.state.todoData.findIndex((item) => item.id === id)
    const desiredTask = {
      ...this.state.todoData[desiredTaskIndex],
    }
    const before = this.state.todoData.slice(0, desiredTaskIndex)
    const after = this.state.todoData.slice(desiredTaskIndex + 1)

    return [desiredTask, desiredTaskIndex, before, after]
  }

  editTask = (id) => {
    this.setState(({ todoData }) => {
      const [, editTaskIndex, before, after] = this.searchTask(id)

      if (todoData[editTaskIndex].completed) {
        return false
      }

      const editTask = { ...todoData[editTaskIndex] }
      editTask.edit = !editTask.edit

      const newTodoData = [...before, editTask, ...after]

      return {
        todoData: newTodoData,
      }
    })
  }

  changeTextTask = (id, textTask) => {
    this.setState(() => {
      const [changeTextTask, , before, after] = this.searchTask(id)

      changeTextTask.textTask = textTask

      const newTodoData = [...before, changeTextTask, ...after]

      return {
        todoData: newTodoData,
      }
    })
  }

  completedTask = (id) => {
    this.setState(() => {
      const [completedTask, , before, after] = this.searchTask(id)

      completedTask.completed = !completedTask.completed

      const newTodoData = [...before, completedTask, ...after]

      return {
        todoData: newTodoData,
      }
    })
  }

  deleteTask = (id) => {
    this.setState(() => {
      const [, , before, after] = this.searchTask(id)
      const newTodoData = [...before, ...after]

      return {
        todoData: newTodoData,
      }
    })
  }

  addTask = (textTask) => {
    const defaultProps = {
      textTask: 'New task (add text)',
    }
    const newTask = this.createTask(textTask || defaultProps.textTask)
    this.setState(({ todoData }) => {
      const newTodoData = [...todoData, newTask]

      return {
        todoData: newTodoData,
      }
    })
  }

  changeTaskList = (parameterTask) => {
    this.setState({
      parameterTask,
    })
  }

  deleteCompleted = () => {
    this.setState(({ todoData }) => {
      const noCompletedTasks = todoData.filter((item) => !item.completed)

      return {
        todoData: noCompletedTasks,
      }
    })
  }

  createTask(textTask) {
    return {
      textTask,
      id: nanoid(),
      completed: false,
      timeCreated: new Date(),
      edit: false,
    }
  }

  render() {
    const { todoData, parameterTask } = this.state

    let sendTodoData
    if (parameterTask === 'Active') {
      sendTodoData = todoData.filter((item) => !item.completed)
    } else if (parameterTask === 'Completed') {
      sendTodoData = todoData.filter((item) => item.completed)
    } else {
      sendTodoData = todoData
    }
    const countNoCompletedTasks = todoData.filter((item) => !item.completed).length

    return (
      <div>
        <NewTaskForm addTask={this.addTask} />
        <TaskList
          todos={sendTodoData}
          onDeleted={(id) => this.deleteTask(id)}
          onChange={(id) => this.editTask(id)}
          onCompleteTask={(id) => this.completedTask(id)}
          addTask={(textTask) => this.addTask(textTask)}
          changeTextTask={(id, textTask) => {
            this.changeTextTask(id, textTask)
            this.editTask(id)
          }}
        />
        <Footer
          changeTaskList={this.changeTaskList}
          parameterTask={parameterTask}
          deleteCompleted={this.deleteCompleted}
          countNoCompletedTasks={countNoCompletedTasks}
        />
      </div>
    )
  }
}

export { App }
