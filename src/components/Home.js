import { useReducer, useEffect, useRef } from 'react';
import Header from './Header';
import About from './About';
import Discussion from './Discussion';
import Footer from './Footer';
import Sketch from './Sketch';
import { Line, defaults } from 'react-chartjs-2';
import reducer from '../utils/reducers';

defaults.global.tooltips.enabled = false
defaults.global.legend.position = 'bottom'

const styles = {
  hov: {
    cursor: 'pointer',
  },
  right: {
    float: "right",
  },
  space: {
    margin: "5px",
  },
  red: {
    backgroundColor: 'black',
    color: 'white',
    margin: "3px",
  },
}

const initialState = {
  isRunning: false,
  kHatVals: [],
  kHatAve: [],
  govHatVals: [],
  govHatAve: [],
  uVals: [],
  uAve: [],
  stateVals: [0.1, 0.005, 0.0162, 0.132],
  time: 0,
  periods: 0,
  mil: 250,
  gamma: 0.03,
  rho: 0.5,
  theta: 0.6,
  tau: 0.3,
  psi: 0.5,
  i: 0.01,
  delta: 0.06,
  ud: 0.80,
  eta: 2500,
  capB: 0.04,
  xi: 6,
  sigma: 0.3,
  gamma0: 0.03,
  sd: 0.0,
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const idRef = useRef(0);

  useEffect(() => {
    if (!state.isRunning) {
      return;
    } else {
      idRef.current = setInterval(() => dispatch({ type: 'iterate' }), state.mil);
      return () => {
        clearInterval(idRef.current);
        idRef.current = 0;
      };
    };
  }, [state.isRunning]);

  return (
    <div className="notification is-black">
      <Header />
      <About />

      {/* Display simulation control panel */}
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p className="title is-4 is-size-6-mobile">
              Control panel
            </p>
            <header className="navbar">
              <a className="button"
                style={styles.red}
                onClick={() => dispatch({ type: "run" })}
              >
                <span>Run</span>
              </a>
              <a className="button"
                style={styles.red}
                onClick={() => dispatch({ type: "stop" })}
              >
                <span>Pause</span>
              </a>
              <a className="button"
                style={styles.red}
                onClick={() => dispatch({ type: "reset" })}
              >
                <span>Reset</span>
              </a>

            </header>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p className="title is-4 is-size-6-mobile">
              Exports + government expenditures
            </p>
            <p>
              Mean annual growth rate: {state.gamma0.toFixed(2)}
              <br>
              </br>


              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "increasegamma0" })}
              >
                <span>+</span>
              </a>
              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "decreasegamma0" })}
              >
                <span>-</span>
              </a>
              <br>
              </br>
            </p>
            <p>
              Standard deviation: {Math.abs(state.sd.toFixed(2))}
              <br>
              </br>


              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "increasesd" })}
              >
                <span>+</span>
              </a>
              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "decreasesd" })}
              >
                <span>-</span>
              </a>
            </p>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p className="title is-4 is-size-6-mobile">
              Consumer spending
            </p>
            <p>
              Target financial assets/income ratio: {state.sigma.toFixed(2)}
              <br>
              </br>


              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "increasesigma" })}
              >
                <span>+</span>
              </a>
              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "decreasesigma" })}
              >
                <span>-</span>
              </a>
              <br>
              </br>
            </p>
            <p>
              Adjustment speed: {state.xi.toFixed(2)}
              <br>
              </br>


              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "increasexi" })}
              >
                <span>+</span>
              </a>
              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "decreasexi" })}
              >
                <span>-</span>
              </a>
            </p>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child box">
            <p className="title is-4 is-size-6-mobile">
              Investment
            </p>
            <p>
              Target capacity utilization rate: {state.ud.toFixed(2)}
              <br>
              </br>


              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "increaseud" })}
              >
                <span>+</span>
              </a>
              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "decreaseud" })}
              >
                <span>-</span>
              </a>
              <br>
              </br>
            </p>
            <p>
              Scaled adjustment speed: {(state.eta * 0.02 * 0.02).toFixed(2)}
              <br>
              </br>


              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "increaseeta" })}
              >
                <span>+</span>
              </a>
              <a className="button is-black is-small"
                style={styles.space}
                onClick={() => dispatch({ type: "decreaseeta" })}
              >
                <span>-</span>
              </a>
            </p>
          </article>
        </div>
      </div>

      {/* Display dynamic charts */}
      <div className='box'>
        <p className="title is-4 is-size-6-mobile">
          Capital accumulation
        </p>
        <Line
          data={{
            labels: xValues(state.time),
            datasets: [
              {
                label: 'Annual rate of capital accumulation',
                data: state.kHatVals,
                backgroundColor: 'white',
                borderColor: '#A00000',
                fill: false,
                cubicInterpolationMode: 'monotone',
                interaction: {
                  intersect: false
                },
                radius: 0,
              },
              {
                label: 'Long-run average rate of accumulation',
                data: state.kHatAve,
                backgroundColor: 'white',
                borderColor: 'black',
                fill: false,
                cubicInterpolationMode: 'monotone',
                interaction: {
                  intersect: false
                },
                radius: 0,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Chart.js Line Chart'
              }
            }
          }}
        />
      </div>
      <div className='box'>
        <p className="title is-4 is-size-6-mobile">
          Capacity utilization
        </p>
        <Line
          data={{
            labels: xValues(state.time),
            datasets: [
              {
                label: 'Rate of capacity utilization',
                data: state.uVals,
                backgroundColor: 'white',
                borderColor: '#A00000',
                fill: false,
                cubicInterpolationMode: 'monotone',
                interaction: {
                  intersect: false
                },
                radius: 0,
              },
              {
                label: 'Long-run average rate of capacity utilization',
                data: state.uAve,
                backgroundColor: 'white',
                borderColor: 'black',
                fill: false,
                cubicInterpolationMode: 'monotone',
                interaction: {
                  intersect: false
                },
                radius: 0,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Chart.js Line Chart'
              }
            }
          }}
        />
      </div>

      <div className='box'>
        <p className="title is-4 is-size-6-mobile">
          Exports + government spending
        </p>
        <Line
          data={{
            labels: xValues(state.time),
            datasets: [
              {
                label: 'Annual growth rate of exports + government spending',
                data: state.govHatVals,
                backgroundColor: 'white',
                borderColor: '#A00000',
                fill: false,
                cubicInterpolationMode: 'monotone',
                interaction: {
                  intersect: false
                },
                radius: 0,
              },
              {
                label: 'Long-run average growth rate',
                data: state.govHatAve,
                backgroundColor: 'white',
                borderColor: 'black',
                fill: false,
                cubicInterpolationMode: 'monotone',
                interaction: {
                  intersect: false
                },
                radius: 0,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Chart.js Line Chart'
              }
            }
          }}
        />
      </div>

      <Discussion />

      <Sketch />

      <Footer />
    </div>
  )
}

function xValues(n) {
  const arr = [...Array(n)].map((_, x) => x + 1);
  arr.pop();
  return arr;
}