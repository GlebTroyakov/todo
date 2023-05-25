import React from 'react'
import './Timer.css'
import Countdown, { zeroPad } from 'react-countdown'
import PropTypes from 'prop-types'

import start from '../../image/start.png'
import pause from '../../image/pause.png'

export function Timer({ timeSeconds, runTimer, onStartTimer, onPauseTimer, id }) {
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <span>00:00</span>
    }

    return (
      <span>
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    )
  }

  let countdownApi = null

  const setRef = (countdown) => {
    if (countdown) {
      countdownApi = countdown.getApi()
    }
  }

  const onClickStart = (idTask) => {
    if (!runTimer) {
      countdownApi.start()
      onStartTimer(idTask)
    }
  }

  const onClickPause = (idTask) => {
    if (runTimer) {
      countdownApi.pause()
      onPauseTimer(idTask)
    }
  }

  const buttonStart = (
    <button className="timer-button" type="button" aria-label="start timer" onClick={() => onClickStart(id)}>
      <img className="timer-button__icon" alt="start timer" src={start} />
    </button>
  )

  const buttonPause = (
    <button className="timer-button" type="button" aria-label="pause timer" onClick={() => onClickPause(id)}>
      <img className="timer-button__icon" alt="pause timer" src={pause} />
    </button>
  )

  return (
    <div className="timer">
      {runTimer && timeSeconds > 0 ? buttonPause : buttonStart}
      <span className="timer-time">
        <Countdown date={Date.now() + timeSeconds * 1000} autoStart={runTimer} renderer={renderer} ref={setRef} />
      </span>
    </div>
  )
}

Timer.propTypes = {
  timeSeconds: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  runTimer: PropTypes.bool.isRequired,
  onPauseTimer: PropTypes.func.isRequired,
  onStartTimer: PropTypes.func.isRequired,
}
