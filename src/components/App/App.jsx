import React from 'react'
import { nanoid } from 'nanoid'

import { TaskList } from '../TaskList'
import { Footer } from '../Footer'
import { NewTaskForm } from '../NewTaskForm'
import './App.css'

// export function App() {
//   function createTask(textTask, timeSeconds = 0) {
//     return {
//       textTask,
//       id: nanoid(),
//       completed: false,
//       edit: false,
//       timeCreated: new Date(),
//       timeSeconds,
//       runTimer: false,
//       timerId: null,
//     }
//   }

//   const [todoData, setTodoData] = useState([createTask('First', 300), createTask('Second', 50), createTask('Third')])
//   const [parameterTask, setParameterTask] = useState('All')

//   const searchTask = (id) => {
//     const desiredTaskIndex = todoData.findIndex((item) => item.id === id)
//     const desiredTask = {
//       ...todoData[desiredTaskIndex],
//     }
//     const before = todoData.slice(0, desiredTaskIndex)
//     const after = todoData.slice(desiredTaskIndex + 1)

//     return [desiredTask, desiredTaskIndex, before, after]
//   }

//   const editTask = (id) => {
//     const [, editTaskIndex, before, after] = searchTask(id)

//     if (!todoData[editTaskIndex].completed) {
//       const changeTask = { ...todoData[editTaskIndex] }
//       changeTask.edit = !changeTask.edit

//       const newTodoData = [...before, changeTask, ...after]
//       setTodoData(newTodoData)
//     }
//   }

//   const completedTask = (id) => {
//     const [changeTask, , before, after] = searchTask(id)

//     changeTask.completed = !changeTask.completed

//     const newTodoData = [...before, changeTask, ...after]
//     setTodoData(newTodoData)
//   }

//   const changeTextTask = (id, textTask) => {
//     const [changeTask, , before, after] = searchTask(id)

//     changeTask.textTask = textTask

//     const newTodoData = [...before, changeTask, ...after]
//     setTodoData(newTodoData)
//   }

//   const deleteTask = (id) => {
//     const [task, , before, after] = searchTask(id)
//     clearInterval(task.timerId)
//     const newTodoData = [...before, ...after]
//     setTodoData(newTodoData)
//   }

//   const addTask = (textTask, timeSeconds = 0) => {
//     const newTask = createTask(textTask, timeSeconds)
//     const newTodoData = [...todoData, newTask]
//     setTodoData(newTodoData)
//   }

//   const changeTaskList = (newParameterTask) => {
//     setParameterTask(newParameterTask)
//   }

//   const deleteCompleted = () => {
//     const noCompletedTasks = todoData.filter((item) => {
//       if (item.completed) {
//         clearInterval(item.timerId)
//         return false
//       }

//       return true
//     })
//     setTodoData(noCompletedTasks)
//   }

//   const updateTimer = (id) => {
//     const [updateTimerTask, , before, after] = searchTask(id)
//     const { timeSeconds, timerId } = updateTimerTask

//     let newTask

//     if (timeSeconds > 0) {
//       newTask = { ...updateTimerTask, timeSeconds: timeSeconds - 1 }
//     } else {
//       clearInterval(timerId)
//       newTask = { ...updateTimerTask, timeSeconds: 0, runTimer: false }
//     }

//     const newTodoData = [...before, newTask, ...after]
//     setTodoData(newTodoData)
//   }

//   const startTimer = (id) => {
//     const [runTimerTask, , before, after] = searchTask(id)

//     const timerId = setInterval(() => {
//       updateTimer(id)
//     }, 1000)

//     const newTask = { ...runTimerTask, runTimer: true, timerId }
//     const newTodoData = [...before, newTask, ...after]
//     setTodoData(newTodoData)
//   }

//   const pauseTimer = (id) => {
//     const [pauseTimerTask, , before, after] = searchTask(id)

//     const newTask = { ...pauseTimerTask, runTimer: false }

//     clearInterval(pauseTimerTask.timerId)
//     const newTodoData = [...before, newTask, ...after]

//     setTodoData(newTodoData)
//   }

//   let sendTodoData
//   if (parameterTask === 'Active') {
//     sendTodoData = todoData.filter((item) => !item.completed)
//   } else if (parameterTask === 'Completed') {
//     sendTodoData = todoData.filter((item) => item.completed)
//   } else {
//     sendTodoData = todoData
//   }
//   const countNoCompletedTasks = todoData.filter((item) => !item.completed).length

//   return (
//     <div>
//       <NewTaskForm addTask={addTask} />
//       <TaskList
//         todos={sendTodoData}
//         onDeleted={(id) => deleteTask(id)}
//         onChange={(id) => editTask(id)}
//         onCompleteTask={(id) => completedTask(id)}
//         onStartTimer={(id) => startTimer(id)}
//         onPauseTimer={(id) => pauseTimer(id)}
//         changeTextTask={(id, textTask) => {
//           changeTextTask(id, textTask)
//           editTask(id)
//         }}
//       />
//       <Footer
//         changeTaskList={changeTaskList}
//         parameterTask={parameterTask}
//         deleteCompleted={deleteCompleted}
//         countNoCompletedTasks={countNoCompletedTasks}
//       />
//     </div>
//   )
// }

export class App extends React.Component {
  state = {
    todoData: [this.createTask('First', 300), this.createTask('Second', 50), this.createTask('Third')],
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
      const [task, , before, after] = this.searchTask(id)
      clearInterval(task.timerId)
      const newTodoData = [...before, ...after]

      return {
        todoData: newTodoData,
      }
    })
  }

  addTask = (textTask, timeSeconds = 0) => {
    const newTask = this.createTask(textTask, timeSeconds)
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
      const noCompletedTasks = todoData.filter((item) => {
        if (item.completed) {
          clearInterval(item.timerId)
          return false
        }

        return true
      })

      return {
        todoData: noCompletedTasks,
      }
    })
  }

  updateTimer = (id) => {
    this.setState(() => {
      const [updateTimerTask, , before, after] = this.searchTask(id)
      const { timeSeconds, timerId } = updateTimerTask

      let newTask

      if (timeSeconds > 0) {
        newTask = { ...updateTimerTask, timeSeconds: timeSeconds - 1 }
      } else {
        clearInterval(timerId)
        newTask = { ...updateTimerTask, timeSeconds: 0, runTimer: false }
      }

      const newTodoData = [...before, newTask, ...after]
      return {
        todoData: newTodoData,
      }
    })
  }

  startTimer = (id) => {
    this.setState(() => {
      const [runTimerTask, , before, after] = this.searchTask(id)

      const timerId = setInterval(() => {
        this.updateTimer(id)
      }, 1000)

      const newTask = { ...runTimerTask, runTimer: true, timerId }
      const newTodoData = [...before, newTask, ...after]
      return {
        todoData: newTodoData,
      }
    })
  }

  pauseTimer = (id) => {
    this.setState(() => {
      const [pauseTimerTask, , before, after] = this.searchTask(id)

      const newTask = { ...pauseTimerTask, runTimer: false }

      clearInterval(pauseTimerTask.timerId)
      const newTodoData = [...before, newTask, ...after]

      return {
        todoData: newTodoData,
      }
    })
  }

  createTask(textTask, timeSeconds = 0) {
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
          onStartTimer={(id) => this.startTimer(id)}
          onPauseTimer={(id) => this.pauseTimer(id)}
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
