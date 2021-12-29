let title = "Time to work!";
const standardSessionLength = 25;
const standardBreakLength = 5;
const minuteConverter = 60000;
let variableSessionLength = standardSessionLength;
let variableBreakLength = standardBreakLength;

function Timer(props) {
  return (
    <div className="time">
      <p id="time-left">
        {/*<span className="digits">*/}
        {/*("0" + Math.floor((props.time / minuteConverter) % 60)).slice(-2)*/}
        {("0" + Math.floor(props.time / minuteConverter)).slice(-2)}:
        {/*</span>*/}
        {/*<span className="digits">*/}
        {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}
        {/*</span>*/}
        {/*<span className="digits mili-sec">
        {("0" + ((props.time / 10) % 100)).slice(-2)}
      </span>*/}
      </p>
    </div>
  );
}

function Clock() {
  const [clockIsRunning, setclockIsRunning] = React.useState(false);
  const [time, setTime, currentTime] = React.useState(
    standardSessionLength * minuteConverter
  );
  const [weAreOnABreak, setWeAreOnABreak] = React.useState(false);
  const [sessionLength, setSessionLength] = React.useState(
    standardSessionLength
  );
  const [breakLength, setBreakLength] = React.useState(standardBreakLength);

  React.useEffect(() => {
    let interval = null;

    if (clockIsRunning && time > 0) {
      {
        /*interval = setInterval(() => {
        setTime((time) => time - 10);
      }, 10);*/
      }
      setTime((time) => time - 10);
    } else if (clockIsRunning && time == 0) {
      clearInterval(interval);
      switchMode();
      setTimeout(function () {
        switchTime();
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [clockIsRunning, weAreOnABreak, time]);

  const handleStartStop = () => {
    if (clockIsRunning) {
      setclockIsRunning(false);
    } else {
      setclockIsRunning(true);
    }
  };

  function switchMode() {
    document.getElementById("beep").play();
    setclockIsRunning(false);
    if (!weAreOnABreak) {
      setWeAreOnABreak(true);
      title = "Time for a break!";
    } else {
      setWeAreOnABreak(false);
      title = "Time to work!";
    }
  }

  function switchTime() {
    if (!weAreOnABreak) {
      setTime(variableBreakLength * minuteConverter);
    } else {
      setTime(variableSessionLength * minuteConverter);
    }
    setclockIsRunning(true);
  }

  const handleReset = () => {
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    title = "Time to work!";
    variableSessionLength = standardSessionLength;
    variableBreakLength = standardBreakLength;
    setSessionLength(variableSessionLength);
    setBreakLength(variableBreakLength);
    setclockIsRunning(false);
    setWeAreOnABreak(false);
    setTime(variableSessionLength * minuteConverter);
  };

  const setTimeSettings = (event) => {
    if (event.target.id == "session-increment") {
      if (sessionLength < 60) {
        variableSessionLength++;
        setSessionLength(variableSessionLength);
        if (!weAreOnABreak && !clockIsRunning) {
          setTime(variableSessionLength * minuteConverter);
        }
      }
    } else if (event.target.id == "session-decrement") {
      if (sessionLength > 1) {
        variableSessionLength--;
        setSessionLength(variableSessionLength);
        if (!weAreOnABreak && !clockIsRunning) {
          setTime(variableSessionLength * minuteConverter);
        }
      }
    } else if (event.target.id == "break-increment") {
      if (breakLength < 60) {
        variableBreakLength++;
        setBreakLength(variableBreakLength);
        if (weAreOnABreak && !clockIsRunning) {
          setTime(variableBreakLength * minuteConverter);
        }
      }
    } else if (event.target.id == "break-decrement") {
      if (breakLength > 1) {
        variableBreakLength--;
        setBreakLength(variableBreakLength);
        if (weAreOnABreak && !clockIsRunning) {
          setTime(variableBreakLength * minuteConverter);
        }
      }
    }
  };

  return (
    <body>
      <div className="stopwatch">
        <h1 id="timer-label">{title}</h1>
        <p id="session-label">
          <button
            className="glow-on-hover"
            id="session-increment"
            type="button"
            onClick={setTimeSettings}
          >
            +
          </button>
          Session Length: <span id="session-length">{sessionLength}</span>
          <button
            className="glow-on-hover"
            id="session-decrement"
            type="button"
            onClick={setTimeSettings}
          >
            -
          </button>
        </p>
        <p id="break-label">
          <button
            className="glow-on-hover"
            id="break-increment"
            type="button"
            onClick={setTimeSettings}
          >
            +
          </button>
          Break Length: <span id="break-length">{breakLength}</span>
          <button
            className="glow-on-hover"
            id="break-decrement"
            type="button"
            onClick={setTimeSettings}
          >
            -
          </button>
        </p>
        <div class="circle">
          <Timer time={time} />
        </div>
        <div className="controls">
          <button
            className="glow-on-hover"
            type="button"
            id="start_stop"
            onClick={handleStartStop}
          >
            Start/Stop
          </button>
          <button
            className="glow-on-hover"
            type="button"
            id="reset"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        <audio
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    </body>
  );
}

ReactDOM.render(<Clock />, document.getElementById("app"));
