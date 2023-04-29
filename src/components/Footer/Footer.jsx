import React from 'react'
import PropTypes from 'prop-types'

import { TaskFilter } from '../TaskFilter'
import './Footer.css'

class Footer extends React.PureComponent {
  render() {
    const { changeTaskList, parameterTask, deleteCompleted, countNoCompletedTasks } = this.props

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

export { Footer }
