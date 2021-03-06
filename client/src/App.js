import { useState, useEffect, useRef } from 'react';

import './App.css';
import Break from './components/Break';
import Session from './components/Session';
import TimeLeft from './components/TimeLeft';

function App() {
  const audioElement = useRef(null);
  const [currentSessionType, setCurrentSessionType] = useState('Session');
  const [intervalId, setIntervalId] = useState(null);
  const [sessionLength, setSessionLength] = useState(60 * 2);
  const [breakLength, setBreakLength] = useState(60);
  const [timeLeft, setTimeLeft] = useState(sessionLength);

  // change timeLeft whenever sessionLength changes
  useEffect(() => {
    setTimeLeft(sessionLength);
  }, [sessionLength]);

  console.log("inside app, outside setInterval, currentSessionType: ", currentSessionType);
  // after calling setCurrentSessionType('Break'), this line logs, correctly, Break

  const isStarted = intervalId !== null;
  function handleStartStopClick() {
    if (isStarted) {
      // if we are in started mode:
      // we want to stop the timer
      // clearInterval
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      // if we are in stopped mode:
      // decrement timeLeft by one every second (1000 ms)
      // to do this we'll use setInterval
      const newIntervalId = setInterval(() => { // updater function from useState hook doesn't work in this
                                                // block for some reason; currentSessionType outside this block
                                                // is updated correctly, but upon entering this block currentSessionType
                                                // is stuck in "Session"
        console.log(currentSessionType.toUpperCase());  // this logs SESSION even after calling
                                                // setCurrentSessionType("Break")
        setTimeLeft(prevTimeLeft => {
          const newTimeLeft = prevTimeLeft - 1;
          if (newTimeLeft >= 0) {
            return prevTimeLeft - 1;
          }
          // time left is less than zero
          audioElement.current.play();
          // if session:
          if (currentSessionType === 'Session') {
            console.log("inside currentSessionType === 'Session' if block, before calling setCurrentSessionType('Break'), currentSessionType: ", currentSessionType);
            // switch to break
            setCurrentSessionType('Break');
            console.log("inside currentSessionType === 'Session' if block, after calling setCurrentSessionType('Break'), currentSessionType: ", currentSessionType);
            // setTimeLeft to breakLength
            setTimeLeft(breakLength);
          }
          // if break
          else if (currentSessionType === 'Break') {
            console.log("inside currentSessionType === 'Break' if block, before calling setCurrentSessionType('Session'), currentSessionType: ", currentSessionType);
            // switch to session
            setCurrentSessionType('Session');
            console.log("inside currentSessionType === 'Break' if block, after calling setCurrentSessionType('Session'), currentSessionType: ", currentSessionType);
            // setTimeLeft to sessionLength
            setTimeLeft(sessionLength);
          }
        });
      }, 1000);
      setIntervalId(newIntervalId);
    }
  }

  function handleResetButtonClick() {
    // reset audio
    audioElement.current.load();
    // clear the timeout interval
    clearInterval(intervalId);
    // set the intervalId null
    setIntervalId(null);
    // set the sessionType to 'Session'
    setCurrentSessionType('Session');
    // reset the session length to 25 minutes
    setSessionLength(60 * 2);
    // reset the break length to 5 minutes
    setBreakLength(60 * 1);
    // reset the timer to 25 minutes (initial session length)
    setTimeLeft(60 * 2);
  }

  return (
    <div className="App">
      <Break breakLength={breakLength} />
      <TimeLeft 
        handleStartStopClick={handleStartStopClick}
        timerLabel={currentSessionType}
        startStopButtonLabel={isStarted ? 'Stop' : 'Start'}
        timeLeft={timeLeft}
        // breakLength={breakLength} 
        // sessionLength={sessionLength} 
      />
      <Session sessionLength={sessionLength} />
      <button id="reset" onClick={handleResetButtonClick}>
        Reset
      </button>
      <audio id="beep" ref={audioElement}>
        <source src="https://www.soundjay.com/misc/sounds/hohner-melodica-2.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;
