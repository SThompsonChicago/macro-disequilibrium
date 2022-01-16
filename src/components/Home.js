import { useReducer, useEffect, useRef } from 'react';

const gamma0 = 0.03;

const styles = {
    hov: {
      cursor: 'pointer',
    },
    right: {
      float: "right",
    },
    space: {
      margin:"5px",
    },
    red: {
      backgroundColor:'black',
      color:'white',
      margin:"3px",
      fontWeight:1000,
    },
  }

const initialState = {
    isRunning: false,
    vector: [1, 1, 1, 1],
    time: 0,
    periods: 0,
    mil: 250,
    gamma: gamma0 + 0.01 * (Math.random() - 0.5)
}

export default function Home() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const idRef = useRef(0);

    useEffect(() => {
        if(!state.isRunning) {
            return;
        } else {
            idRef.current = setInterval(() => dispatch({ type: 'iterate'}), state.mil);
            return () => {
                clearInterval(idRef.current);
                idRef.current = 0;
            };
        };
    }, [state.isRunning]);

    return (
        <div>
            <div className="box">
        <header className="navbar">
            <a className="button"
  style={styles.red}
  onClick={() => dispatch({ type: "run" })}
    >
      <span>RUN</span>
    </a>
    <a className="button"
    style={styles.red}
    onClick={() => dispatch({ type: "stop" })}
    >
      <span>STOP</span>
    </a>
    <a className="button"
    style={styles.red}
    onClick={() => dispatch({ type: "reset" })}
    >
      <span>RESET</span>
    </a>

        </header>
        <p>
time: {state.time}
</p>
<p>
    gamma: {state.gamma}
</p>
</div>
</div>
    )
}

function reducer(state, action){
    switch(action.type) {
        case "run":
            return {...state, isRunning: true };
        case "stop":
            return {...state, isRunning: false};
        case "reset":
            return {...state, isRunning: false, time: 0};
        case "iterate":
            return {...state, time: state.time + 1, gamma: gamma0 + 0.01 * (Math.random() - 0.5)};
        default:
            throw new Error();
    }
}