import React from 'react'
import PropTypes from 'prop-types'

import { TaskFilter } from '../TaskFilter'
import './Footer.css'

export function Footer({ changeTaskList, parameterTask, deleteCompleted, countNoCompletedTasks }) {
  return (
    <footer className="footer">
      <span className="todo-count">{countNoCompletedTasks}</span>
      <TaskFilter changeTaskList={changeTaskList} parameterTask={parameterTask} />
      <button className="clear-completed" onClick={deleteCompleted} type="button">
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  countNoCompletedTasks: 'no counter',
}

Footer.propTypes = {
  changeTaskList: PropTypes.func.isRequired,
  parameterTask: PropTypes.string.isRequired,
  deleteCompleted: PropTypes.func.isRequired,
  countNoCompletedTasks: PropTypes.number,
}
