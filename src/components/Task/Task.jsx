import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import './Task.css'
import PropTypes from 'prop-types'

import { Timer } from '../Timer'

export function Task({
  textTask,
  onDeleted,
  onChange,
  onCompleteTask,
  completed,
  timeCreated,
  id,
  timeSeconds,
  runTimer,
  onStartTimer,
  onPauseTimer,
}) {
  return (
    <div className="view">
      <input className="toggle" type="checkbox" checked={!!completed} onChange={onCompleteTask} id={id} />
      <label htmlFor={id}>
        <span className="description" onClick={onCompleteTask} aria-hidden="true">
          {textTask}
        </span>
        <Timer
          timeSeconds={timeSeconds}
          runTimer={runTimer}
          id={id}
          onStartTimer={() => onStartTimer(id)}
          onPauseTimer={() => onPauseTimer(id)}
        />
        <span className="created">
          {`created ${formatDistanceToNow(timeCreated, {
            includeSeconds: true,
          })} ago`}
        </span>
      </label>
      <button className="icon icon-edit" onClick={onChange} type="button" aria-label="edition" />
      <button className="icon icon-destroy" onClick={onDeleted} type="button" aria-label="destroy" />
    </div>
  )
}

Task.propTypes = {
  textTask: PropTypes.string.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onCompleteTask: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  timeSeconds: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  runTimer: PropTypes.bool.isRequired,
  onPauseTimer: PropTypes.func.isRequired,
  onStartTimer: PropTypes.func.isRequired,
}
