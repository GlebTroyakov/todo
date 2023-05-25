import React from 'react'
import './TaskFilter.css'
import PropTypes from 'prop-types'

export function TaskFilter({ changeTaskList, parameterTask }) {
  const addButton = (textButton) => (
    <button
      className={textButton === parameterTask ? 'selected' : ''}
      onClick={(event) => {
        changeTaskList(event.target.textContent)
      }}
      type="button"
    >
      {textButton}
    </button>
  )

  return (
    <ul className="filters">
      <li>{addButton('All')}</li>
      <li>{addButton('Active')}</li>
      <li>{addButton('Completed')}</li>
    </ul>
  )
}

TaskFilter.defaultProps = {
  parameterTask: 'All',
}

TaskFilter.propTypes = {
  changeTaskList: PropTypes.func.isRequired,
  parameterTask: PropTypes.string,
}
