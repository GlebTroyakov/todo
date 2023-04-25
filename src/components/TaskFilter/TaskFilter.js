import React from 'react'
import './TaskFilter.css'
import PropTypes from 'prop-types'

class TaskFilter extends React.Component {
  addButton = (textButton) => (
    <button
      className={textButton === this.props.parameterTask ? 'selected' : ''}
      onClick={(event) => {
        this.props.changeTaskList(event.target.textContent)
      }}
      type="button"
    >
      {textButton}
    </button>
  )

  render() {
    return (
      <ul className="filters">
        <li>{this.addButton('All')}</li>
        <li>{this.addButton('Active')}</li>
        <li>{this.addButton('Completed')}</li>
      </ul>
    )
  }
}

TaskFilter.defaultProps = {
  parameterTask: 'All',
}

TaskFilter.propTypes = {
  changeTaskList: PropTypes.arrayOf(PropTypes.func).isRequired,
  parameterTask: PropTypes.string,
}

export default TaskFilter
