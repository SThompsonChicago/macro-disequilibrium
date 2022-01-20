import { useReducer, useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Line, defaults, Bubble } from 'react-chartjs-2'

defaults.global.tooltips.enabled = false
defaults.global.legend.position = 'bottom'

var times = [];
for(var i = 0; i <= 100; i++){
    times.push(i);
}

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
    stateVals: [0.13, 0.02, 0.07, 0.06],
    time: 0,
    periods: 0,
    mil: 250,
    gamma: gamma0 + 0.01 * (Math.random() - 0.5),
    rho: 0.5,
    theta: 0.6,
    tau: 0.3,
    psi: 0.5,
    i: 0.01,
    delta: 0.06,
    ud: 0.7,
    eta: 1000,
    capB: 0.04,
    xi: 25,
    sigma: 0.4,
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
        <div className="notification is-black">
            <Header />
            <div className="box">
            <p className="title is-4 is-size-6-mobile">
                            About this page
                            </p>
                            <p>
                            This is a web application intended to help the user visualize the dynamics of a macroeconomic model. A distinguishing feature of the model is the fact that, rather than relying on the concept of equilibrium, long-run dynamics are understood in terms of time averages. This means variables can fluctuate in complex and unpredictable ways, but the long-run averages converge toward values that are calculated using simple formulas. 
                            <br/>
                            <br/>
                            To see how this works, click the "RUN" button in the control panel below. Underneath the control panel, the graphs display animations describing the dynamics of different variables in the model. Scroll down further to see additional information about the model. 
                        </p>


            </div>
            <div className="box">
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
        
</div>

<div className='box'>
<p className="title is-4 is-size-6-mobile">
                            Government spending
                        </p>
<Line
        data={{
          labels: xValues(state.time),
          datasets: [
            {
              label: 'Growth rate of government spending',
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
              borderColor: 'blue',
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
              borderColor: 'red',
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
                            Capital accumulation
                        </p>
<Line
        data={{
          labels: xValues(state.time),
          datasets: [
            {
              label: 'Rate of capital accumulation',
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
              borderColor: 'blue',
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
              borderColor: 'red',
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
              borderColor: 'blue',
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
              borderColor: 'red',
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
                            In principle, any observed economic dynamics can be interpreted as a series of equilibrium states, and many economists continue to argue that the concept of equilibrium is a useful analytical tool. 
                            However, to have a plausible equilibrium-based theory, one needs to give an explanation of what forces keep economies at or near their equilibrium positions. If an economic system is perturbed by, say, a natural disaster or the discovery of a new invention, then the concept of equilibrium is only going to be relevant if some plausible mechanism exists that tends to restore the economy toward its equilibrium state. This tendency, in which economies move toward equilibriua, is called <i>stability</i>. And economists have struggled to establish conclusively that modern economies have this stability property. 
                            <br>
                            </br>
                            <br>
                            </br>
                            A key stumbling block is the fact that modern economic systems are comprised of billions of interacting variables (consumers, businesses, commodities, prices and so on). Generally it is very difficult to establish stability for systems that have more than a few different variables. Moreover, when a system has a large number of variables, there are good reasons to expect it to be chaotic, rather than stable. Finally, the famous Sonnenschein-Mantel-Debreu theorem suggests that, if we adopt the standard notions of equilibrium and price adjustment from economic theory, then stability cannot be guaranteed. 
                            <br>
                            </br>
                            <br>
                            </br>
                            Motivated by this reasoning, various economists have devised models that do not rely on the concept of equilibrium. The purpose of this app is to illustrate one such model, which is based on a <a href="https://onlinelibrary.wiley.com/doi/10.1111/meca.12377">paper of mine</a> published in the journal <i>Metroeconomica</i>. The basic idea is to use time averages, instead of equilibria, to understand the dynamics. This web application allows the user to run simulations of the model using the control panel below, and see how different parameter inputs affect the dynamics.
                        </p>


            </div>
            <div className="box">
            <p className="title is-4 is-size-6-mobile">
                            A sketch of the model
                            </p>
                            <p>
                            The methodology is largely based on the stock-flow consistent approach developed by Wynne Godley. Godley was one of the few economists who were able to <a href="https://www.ft.com/content/452dc484-9bdc-11de-b214-00144feabdc0">"see the crisis coming"</a> in the run up to the 2007-2008 global crash. The key feature of his analysis is the the attention paid to how monetary transactions between different sectors interact with an aggregate financial structure. Since the financial assets of one sector must be the liabilities of another, if all sectors try to increase their net financial assets at the same time, the system can go into free fall. 
                            <br>
                            </br>
                            <br>
                            </br>
                            The mechanics of this model can be understood as follows. Businesses try to increase (or at least maintain) their market shares over time, which means they must try to keep up with the growth of consumer demand. So they adjust output, as well as investment in new productive capacity, in response to changes in the demand for their products. But there are also limits on how much businesses can (or want) to borrow, and this means that there is an upper limit for how rapidly they can expand productive capacity, with this limit depending on expectations regarding future cashflow. On the other hand, consumers also face an important financial constraint, and this is expressed by the fact that they adjust their spending based on how much cash they have to spend. More precisely, they seek to keep their net financial wealth at a certain targeted level in relation to national income, and adjust spending over time in an attempt to meet this target. 
                            <br>
                            </br>
                            <br>
                            </br>
                            An important feature of the model is that productive investment and consumption demand are largely induced, in the sense that they respond to changes in financial inflows from other sectors. As a result, if there is a third component of aggregate demand that can grow at a semi-autonomous rate, then it can play a special role in driving the aggregate rate of expansion for the economy. Economists have identified a variety of different components that might fullfill this role in practice, including government spending, exports, and debt-financed real-estate investment. For the purposes of illustration, the model here only considers the role of government spending, but it could easily be generalized to include exports and real-estate mortgages as well. 

                        </p>


            </div>
            <Footer/>
</div>
    )
}

function xValues(n){
    const arr = [...Array(n)].map((_, x) => x+1);
    return arr;
}

function update(arr1, arr2, n){
    var num = gamma0 + 0.06 * (Math.random() - 0.5);
    var num2 = 0;
    arr1.push(num);
    num2 = arr1.reduce((x, y) => x+y);
    num2 = num2/n;
    arr2.push(num2);


    return num;
}

function f(arr, obj){
    let arr1 = Array(arr.length);
    let lambda = 1/(obj.rho * (1 - obj.theta * (1 - obj.tau) * (1 - obj.psi)));
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

function rk(arr, obj){
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

  for(let i = 0; i < iterations; i++){
    k[0] = f(current, obj);

    for(let j = 0; j < N; j++){
      vals[j] = current[j] + (h * k[0][j]) / 2; 
    }

    k[1] = f(vals, obj);

    for(let j = 0; j < N; j++){
      vals[j] = current[j] + (h * k[1][j]) / 2;
    }

    k[2] = f(vals, obj);

    for(let j = 0; j < N; j++){
      vals[j] = current[j] + h * k[2][j];
    }

    k[3] = f(vals, obj);

    for(let j = 0; j < N; j++){
      current[j] += h * (k[0][j] + 2 * k[1][j] + 2 * k[2][j] + k[3][j]) / 6;
    }
  }

  let lambda = 1/(obj.rho * (1 - obj.theta * (1 - obj.tau) * (1 - obj.psi)));
  let u = lambda * (current[0] + current[1] + current[2]);
  let r = (1 - obj.tau) * (1 - obj.psi) * obj.rho * u;
  let g = current[1] + obj.theta * r;

  obj.kHatVals.push(g - obj.delta);
  num1 = obj.kHatVals.reduce((x, y) => x+y);
  num1 = num1/(obj.time + 1);
  obj.kHatAve.push(num1);

  obj.uVals.push(u);
  num2 = obj.uVals.reduce((x,y) => x+y);
  num2 = num2/(obj.time + 1);
  obj.uAve.push(num2);

  return current;
    
}

function reducer(state, action){
    switch(action.type) {
        case "run":
            return {...state, isRunning: true };
        case "stop":
            return {...state, isRunning: false};
        case "reset":
            return {...state, isRunning: false, time: 0, govHatVals: [], govHatAve: [], kHatVals: [], kHatAve: [], uVals: [], uAve: []};
        case "iterate":
            return {...state, time: state.time + 1, gamma: update(state.govHatVals, state.govHatAve, state.time + 1), govHatVals: state.govHatVals, govHatAve: state.govHatAve, stateVals: rk(state.stateVals, state)};
        default:
            throw new Error();
    }
}