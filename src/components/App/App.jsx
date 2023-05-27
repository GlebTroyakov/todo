import React, { useState } from 'react'
import { nanoid } from 'nanoid'

import { TaskList } from '../TaskList'
import { Footer } from '../Footer'
import { NewTaskForm } from '../NewTaskForm'
import './App.css'

export function App() {
  function createTask(textTask, timeSeconds = 0) {
    return {
      textTask,
      id: nanoid(),
      completed: false,
      edit: false,
      timeCreated: new Date(),
      timeSeconds,
      runTimer: false,
      timerId: null,
    }
  }

  const [todoData, setTodoData] = useState([createTask('First', 300), createTask('Second', 50), createTask('Third')])
  const [parameterTask, setParameterTask] = useState('All')

  const searchTask = (id, tasks) => {
    const newTasks = [...tasks]
    const index = tasks.findIndex((item) => item.id === id)
    const task = {
      ...tasks[index],
    }

    return [task, index, newTasks]
  }

  const editTask = (id) => {
    setTodoData((tasks) => {
      const [task, index, newTasks] = searchTask(id, tasks)

      if (!task.completed) {
        task.edit = !task.edit

        newTasks.splice(index, 1, task)
      }

      return newTasks
    })
  }

  const completedTask = (id) => {
    setTodoData((tasks) => {
      const [task, index, newTasks] = searchTask(id, tasks)

      task.completed = !task.completed

      newTasks.splice(index, 1, task)

      return newTasks
    })
  }

  const changeTextTask = (id, textTask) => {
    setTodoData((tasks) => {
      const [task, index, newTasks] = searchTask(id, tasks)

      task.textTask = textTask

      newTasks.splice(index, 1, task)

      return newTasks
    })
  }

  const deleteTask = (id) => {
    setTodoData((tasks) => {
      const newTasks = tasks.filter((task) => {
        if (task.id !== id) {
          return true
        }

        clearInterval(task.timerId)
        return false
      })
      return newTasks
    })
  }

  const addTask = (textTask, timeSeconds = 0) => {
    const newTask = createTask(textTask, timeSeconds)
    const newTasks = [...todoData, newTask]
    setTodoData(newTasks)
  }

  const changeTaskList = (newParameterTask) => {
    setParameterTask(newParameterTask)
  }

  const deleteCompleted = () => {
    const noCompletedTasks = todoData.filter((item) => {
      if (item.completed) {
        clearInterval(item.timerId)
        return false
      }

      return true
    })
    setTodoData(noCompletedTasks)
  }

  const updateTimer = (id) => {
    setTodoData((tasks) => {
      const [task, index, newTasks] = searchTask(id, tasks)

      if (task.timeSeconds > 0) {
        task.timeSeconds -= 1
      } else {
        clearInterval(task.timerId)
        task.timeSeconds = 0
        task.runTimer = false
      }
      newTasks.splice(index, 1, task)
      return newTasks
    })
  }

  const startTimer = (id) => {
    setTodoData((tasks) => {
      const [task, index, newTasks] = searchTask(id, tasks)

      const timerId = setInterval(() => {
        updateTimer(id)
      }, 1000)

      const newTask = { ...task, runTimer: true, timerId }

      newTasks.splice(index, 1, newTask)

      return newTasks
    })
  }

  const pauseTimer = (id) => {
    setTodoData((tasks) => {
      const [task, index, newTasks] = searchTask(id, tasks)

      const newTask = { ...task, runTimer: false }
      clearInterval(task.timerId)

      newTasks.splice(index, 1, newTask)

      return newTasks
    })
  }

  function getTasksWithParameter(parameter) {
    let sendTodoData
    if (parameter === 'Active') {
      sendTodoData = todoData.filter((item) => !item.completed)
    } else if (parameter === 'Completed') {
      sendTodoData = todoData.filter((item) => item.completed)
    } else {
      sendTodoData = todoData
    }

    return sendTodoData
  }

  const countNoCompletedTasks = todoData.filter((item) => !item.completed).length

  return (
    <div>
      <NewTaskForm addTask={addTask} />
      <TaskList
        todos={getTasksWithParameter(parameterTask)}
        onDeleted={(id) => deleteTask(id)}
        onChange={(id) => editTask(id)}
        onCompleteTask={(id) => completedTask(id)}
        onStartTimer={(id) => startTimer(id)}
        onPauseTimer={(id) => pauseTimer(id)}
        changeTextTask={(id, textTask) => {
          changeTextTask(id, textTask)
          editTask(id)
        }}
      />
      <Footer
        changeTaskList={changeTaskList}
        parameterTask={parameterTask}
        deleteCompleted={deleteCompleted}
        countNoCompletedTasks={countNoCompletedTasks}
      />
    </div>
  )
}
