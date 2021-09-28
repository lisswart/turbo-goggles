import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import React, { useState, useEffect } from 'react';

momentDurationFormatSetup(moment);

function TimeLeft({ 
  handleStartStopClick, startStopButtonLabel, timeLeft, timerLabel
  // breakLength, sessionLength 
}) {

  const formattedTimeLeft = moment.duration(timeLeft, 's').format('hh:mm:ss', { trim: false });

  return (
    <div id="timer-container">
      <p id="timer-label">{timerLabel}</p>
      <p id="time-left">{formattedTimeLeft}</p>
      <button id="start_stop" onClick={handleStartStopClick}>
        {startStopButtonLabel}
      </button>
    </div>
  );
}

export default TimeLeft;
