import { useReducer, useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Line, defaults, Bubble } from 'react-chartjs-2'

defaults.global.tooltips.enabled = false
defaults.global.legend.position = 'bottom'

var times = [];
for (var i = 0; i <= 100; i++) {
  times.push(i);
}

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
    //fontWeight:1000,
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
  ud: 0.75,
  eta: 2450,
  capB: 0.04,
  xi: 8,
  sigma: 0.4,
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
      <div className="box">
        <p className="title is-4 is-size-6-mobile">
          About this page
        </p>
        <p>
          This is a web application intended to help the user visualize the dynamics of a macroeconomic model from <a href="https://onlinelibrary.wiley.com/doi/10.1111/meca.12377">this article</a>. A distinguishing feature of the model is the fact that, rather than relying on the (empirically dubious) concept of equilibrium, the dynamics are understood by calculating time averages. This means variables can fluctuate in complex and unpredictable ways, but the long-run trends display important regularities that can be predicted with simple mathematical formulae.
          <br />
          <br />
          To see how the model works, click the "Run" button in the control panel below. Underneath the control panel, the graphs display animations describing the dynamics of different variables in the model. Scroll down further to see more detailed information. You can also check out this <a href='https://www.youtube.com/watch?v=fQPoRxZOOuA'>video demonstration</a>.
        </p>


      </div>


      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box">
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
        <div class="tile is-parent">
          <article class="tile is-child box">
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
        <div class="tile is-parent">
          <article class="tile is-child box">
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
        <div class="tile is-parent">
          <article class="tile is-child box">
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
                // backgroundColor: [
                //   'rgba(255, 99, 132, 0.2)',
                //   'rgba(54, 162, 235, 0.2)',
                //   'rgba(255, 206, 86, 0.2)',
                //   'rgba(75, 192, 192, 0.2)',
                //   'rgba(153, 102, 255, 0.2)',
                //   'rgba(255, 159, 64, 0.2)',
                // ],
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
                // backgroundColor: [
                //   'rgba(255, 99, 132, 0.2)',
                //   'rgba(54, 162, 235, 0.2)',
                //   'rgba(255, 206, 86, 0.2)',
                //   'rgba(75, 192, 192, 0.2)',
                //   'rgba(153, 102, 255, 0.2)',
                //   'rgba(255, 159, 64, 0.2)',
                // ],
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
                // backgroundColor: [
                //   'rgba(255, 99, 132, 0.2)',
                //   'rgba(54, 162, 235, 0.2)',
                //   'rgba(255, 206, 86, 0.2)',
                //   'rgba(75, 192, 192, 0.2)',
                //   'rgba(153, 102, 255, 0.2)',
                //   'rgba(255, 159, 64, 0.2)',
                // ],
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


      <div className="box">
        <p className="title is-4 is-size-6-mobile">
          Disequilibrium macroeconomics
        </p>
        <p>
          Is the US economy a system in equilibrium? How about the world economy? Economists have debated these sorts of questions for a long time.
          In principle (and given suitable definitions), any observed economic dynamics can be interpreted as a series of equilibrium states, and many economists continue to argue that the concept of equilibrium is a useful analytical tool.
          However, to have a plausible equilibrium-based theory, one needs to provide some account of the forces that would keep economies at or near their equilibrium positions. If an economy is perturbed from its equilibrium by, say, a natural disaster or the discovery of a new invention, then there would need to be some built-in tendency for the economy to move back toward its equilibrium state. This tendency, when it exists, is called <i>stability</i>. And economists have struggled to establish conclusively that modern economies have this stability property.
          <br>
          </br>
          <br>
          </br>
          A key stumbling block is the fact that modern economic systems are comprised of billions of interacting variables (consumers, businesses, commodities, prices and so on). Generally it is very difficult to establish stability for systems that have more than a few different variables. Moreover, when a system has a large number of variables, there are good reasons to expect it to be chaotic, rather than stable. Finally, the famous Sonnenschein-Mantel-Debreu theorem suggests that, if we adopt the standard notions of equilibrium and price adjustment from economic theory, then stability cannot be guaranteed. Motivated by these ideas, economists have developed a variety of disequilibrium frameworks; this app shows one example, but there are others as well.
        </p>


      </div>
      <div className="box">
        <p className="title is-4 is-size-6-mobile">
          A sketch of the model
        </p>
        <p>
          This app is based on the model in a recently published paper, which is available <a href='https://onlinelibrary.wiley.com/doi/10.1111/meca.12377'>here</a>. A much shorter statement of the model used in this app (with details about the simulations), which just lays out the basic assumptions and equations, can be found <a href='https://sthompsonchicago.github.io/My_portfolio/assets/MacroDisequilibrium.pdf'>here</a>. What follows below is a non-technical explanation.
          <br>
          </br>
          <br>
          </br>
          The methodology for this model is largely based on the stock-flow consistent approach developed by Wynne Godley. Godley was one of the few economists who were able to <a href="https://www.ft.com/content/452dc484-9bdc-11de-b214-00144feabdc0">"see the crisis coming"</a> in the run up to the 2007-2008 global crash. The key feature of his analysis is the recognition of how monetary transactions between different sectors in an economy are linked together by an aggregate financial structure. One implication is that, since the financial assets of one sector must be the liabilities of another, if all sectors try to increase their net financial assets at the same time, the system can go into free fall.
          <br>
          </br>
          <br>
          </br>
          The mechanics of this model can be understood as follows. Businesses have <a href='https://hbr.org/1975/01/market-share-a-key-to-profitability'>important incentives</a> for trying to increase (or at least maintain) their market shares over time. As a result, they must try to keep up with increases in the demand for their products. So they adjust output, as well as investment in new productive capacity, in response to conditions in the market. But there are also constraints on how much businesses can (or want) to borrow, and this means that there is an upper limit for how rapidly they can expand productive capacity; this limit depends on expectations regarding future cashflow. Similarly, consumers also face an important financial constraint, and this is expressed by the fact that they adjust their spending based on how much cash they have to spend. More precisely, they seek to keep their net financial wealth at a certain targeted level in relation to national income, and adjust spending over time in an attempt to meet this target. (This targetted ratio of wealth to income is called a <i>stock-flow norm</i>.)
          <br>
          </br>
          <br>
          </br>
          An important feature of the model is that productive investment and consumption demand are largely <i>induced</i>, in the sense that they respond to changes in financial inflows from other sectors. As a result, if there is a third component of aggregate demand that grows at a semi-autonomous rate, then it will play a special role in driving the rate of expansion for the economy as a whole. Economists have identified a variety of different components that might fullfill this role in practice, including government spending, exports, and debt-financed real-estate investment. For the purposes of illustration, the model here only considers the role of government spending and exports, but it could easily be generalized in various ways.
          <br>
          </br>
          <br>
          </br>
          The dynamical processes in this model tend to be destabilizing, so there is no tendency for solutions to move toward equilibria. However, the user can observe that variables do fluctuate around certain trends. The trend growth rate for the sume of exports and government spending is a parameter in the model, with the default value set to 0.03 (i.e., three percent per year). This drives the long-run dynamics of the system; as can be seen when the simulation is run, the long-run average rate of capital accumulation converges to the same value as the long-run average rate of growth for the sum of exports and government spending. On the other hand, the long-run average value for the capacity utilization rate gravitates toward a targetted level, which by default is set to 0.75 (i.e., seventy-five percent of full capacity).
        </p>


      </div>
      <Footer />
    </div>
  )
}

function xValues(n) {
  const arr = [...Array(n)].map((_, x) => x + 1);
  arr.pop();
  return arr;
}

function update(arr1, arr2, n, gamma0, sd) {
  if (sd === 0) {
    arr1.push(gamma0);
    arr2.push(gamma0);

    return gamma0;

  } else {
    var num = gamma0 + sd * 3.4641016 * (Math.random() - 0.5);
    var num2 = 0;
    arr1.push(num);
    num2 = arr1.reduce((x, y) => x + y);
    num2 = num2 / n;
    arr2.push(num2);

    return num;
  }
}

function f(arr, obj) {
  let arr1 = Array(arr.length);
  let lambda = 1 / (obj.rho * (1 - obj.theta * (1 - obj.tau) * (1 - obj.psi)));
  let u = lambda * (arr[0] + arr[1] + arr[2]);
  let r = (1 - obj.tau) * (1 - obj.psi) * obj.rho * u;
  let g = arr[1] + obj.theta * r;
  let phi = obj.eta * arr[1] * (obj.capB - arr[1]);

  arr1[0] = arr[0] * (obj.gamma - g + obj.delta);
  arr1[1] = phi * (u - obj.ud);
  arr1[2] = arr[2] * (obj.xi * (arr[3] - obj.sigma * obj.rho * u) - g + obj.delta);
  arr1[3] = (1 - obj.tau) * (obj.rho * u + obj.i * arr[3]) - arr[2] - g - arr[3] * (g - obj.delta);

  return arr1;
}

function rk(arr, obj) {
  const N = arr.length;
  const h = 0.05;
  const iterations = 20;
  let num1 = 0;
  let num2 = 0;

  const current = arr;

  let k = Array(4);
  k[0] = Array(N);
  k[1] = Array(N);
  k[2] = Array(N);
  k[3] = Array(N);
  const vals = Array(N);

  for (let i = 0; i < iterations; i++) {
    k[0] = f(current, obj);

    for (let j = 0; j < N; j++) {
      vals[j] = current[j] + (h * k[0][j]) / 2;
    }

    k[1] = f(vals, obj);

    for (let j = 0; j < N; j++) {
      vals[j] = current[j] + (h * k[1][j]) / 2;
    }

    k[2] = f(vals, obj);

    for (let j = 0; j < N; j++) {
      vals[j] = current[j] + h * k[2][j];
    }

    k[3] = f(vals, obj);

    for (let j = 0; j < N; j++) {
      current[j] += h * (k[0][j] + 2 * k[1][j] + 2 * k[2][j] + k[3][j]) / 6;
    }
  }

  let lambda = 1 / (obj.rho * (1 - obj.theta * (1 - obj.tau) * (1 - obj.psi)));
  let u = lambda * (current[0] + current[1] + current[2]);
  let r = (1 - obj.tau) * (1 - obj.psi) * obj.rho * u;
  let g = current[1] + obj.theta * r;

  obj.kHatVals.push(g - obj.delta);
  num1 = obj.kHatVals.reduce((x, y) => x + y);
  num1 = num1 / (obj.time + 1);
  obj.kHatAve.push(num1);

  obj.uVals.push(u);
  num2 = obj.uVals.reduce((x, y) => x + y);
  num2 = num2 / (obj.time + 1);
  obj.uAve.push(num2);

  return current;

}

function reducer(state, action) {
  switch (action.type) {
    case "run":
      return { ...state, isRunning: true };
    case "stop":
      return { ...state, isRunning: false };
    case "reset":
      return { ...state, isRunning: false, time: 0, govHatVals: [], govHatAve: [], kHatVals: [], kHatAve: [], uVals: [], uAve: [] };
    case "iterate":
      return { ...state, time: state.time + 1, gamma: update(state.govHatVals, state.govHatAve, state.time + 1, state.gamma0, state.sd), govHatVals: state.govHatVals, govHatAve: state.govHatAve, stateVals: rk(state.stateVals, state) };
    case "increasegamma0":
      return { ...state, gamma0: (state.gamma0 < 0.05) * (state.gamma0 + 0.01) + (state.gamma0 >= 0.05) * 0.05 };
    case "decreasegamma0":
      return { ...state, gamma0: (state.gamma0 > 0.01) * (state.gamma0 - 0.01) + (state.gamma0 <= 0.01) * 0.01 };
    case "increasesd":
      return { ...state, sd: (state.sd < 0.06) * (state.sd + 0.01) + (state.sd >= 0.06) * 0.06 };
    case "decreasesd":
      return { ...state, sd: (state.sd > 0.0) * (Math.abs(state.sd - 0.01)) + (state.sd <= 0.0) * 0.0 };
    case "increasesigma":
      return { ...state, sigma: (state.sigma < 2) * (state.sigma + 0.1) + (state.sigma >= 2) * 2 };
    case "decreasesigma":
      return { ...state, sigma: (state.sigma > 0.1) * (state.sigma - 0.1) + (state.sigma <= 0.1) * 0.1 };
    case "increasexi":
      return { ...state, xi: (state.xi < 10000) * (state.xi + 1) + (state.xi >= 10000) * 10000 };
    case "decreasexi":
      return { ...state, xi: (state.xi > 1) * (state.xi - 1) + (state.xi <= 1) * 1 };
    case "increaseud":
      return { ...state, ud: (state.ud < 0.9) * (state.ud + 0.05) + (state.ud >= 0.9) * 0.9 };
    case "decreaseud":
      return { ...state, ud: (state.ud > 0.65) * (state.ud - 0.05) + (state.ud <= 0.65) * 0.65 };
    case "increaseeta":
      return { ...state, eta: (state.eta < 5000) * (state.eta + 50) + (state.eta >= 5000) * 5000 };
    case "decreaseeta":
      return { ...state, eta: (state.eta > 50) * (state.eta - 50) + (state.eta <= 50) * 50 };
    default:
      throw new Error();
  }
}