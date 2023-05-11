import React from 'react'
import './Timer.css'
import Countdown, { zeroPad } from 'react-countdown'

import start from '../../image/start.png'
import pause from '../../image/pause.png'

class Timer extends React.PureComponent {
  render() {
    const { timeSeconds, startTimer, onChangeStartTimer, id } = this.props

    const buttonStart = (
      <button className="timer-button" type="button" aria-label="start timer" onClick={() => onChangeStartTimer(id)}>
        <img className="timer-button__icon" alt="start timer" src={start} />
      </button>
    )

    const buttonPause = (
      <button className="timer-button" type="button" aria-label="pause timer" onClick={() => onChangeStartTimer(id)}>
        <img className="timer-button__icon" alt="pause timer" src={pause} />
      </button>
    )

    return (
      <div className="timer">
        {startTimer ? buttonPause : buttonStart}
        <span className="timer-time">
          <Countdown date={Date.now() + timeSeconds * 1000} autoStart={startTimer} />
        </span>
      </div>
    )
  }
}

export { Timer }
