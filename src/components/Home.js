import { useReducer, useEffect, useRef } from 'react';
import Header from './Header';
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
      backgroundColor:'blue',
      color:'white',
      margin:"3px",
      fontWeight:1000,
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
    stateVals: [0.05, 0.01, 0.05, 0.05],
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
        <div>
            <Header />
            <div className="box">
            <p className="title is-4 is-size-6-mobile">
                            About this app
                            </p>
                            <p>
                            Is the US economy a system in equilibrium? How about the world economy? Economists have debated these sorts of questions for a long time. 
                            In principle, any observed economic dynamics can be interpreted as a series of equilibrium states, and many economists continue to argue that the concept of equilibrium is a useful analytical tool. 
                            However, to have a plausible equilibrium-based theory, one needs to give an explanation of what forces keep economies at or near their equilibrium positions. If an economic system is perturbed by, say, a natural disaster, then the concept of equilibrium is only going to be relevant if some plausible mechanism exists that tends to restore the economy toward its equilibrium state. This is called <i>stability</i>. And economists have struggled to establish conclusively that modern economies have this stability property. 
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
                            The basic logic of this model can be understood as follows. Businesses try to increase (or at least maintain) their market shares over time, and that means being able to keep up with the growth of consumer demand. So they adjust output, as well as investment in new productive capacity, in an attempt to keep up with changes in the demand for their products. But there are also limits on how much businesses can (or want) to borrow, and this means that there is an upper limit for how rapidly they can expand productive capacity, with this limit depending on expectations regarding future cashflow. On the other hand, consumers also face an important financial constraint, and this is expressed by the fact that they adjust their spending based on how much cash they have to spend. More precisely, they seek to keep their net financial wealth a certain targeted level in relation to national income, and adjust spending over time in an attempt to meet this target. 
                            <br>
                            </br>
                            <br>
                            </br>
                            An important consequence of these assumptions is that they cause both investment and consumption demand to be induced, in the sense that they depend on expectations about future income and financial holdings. As a result, in order to keep the system going, there needs to be a third source of spending that sustains total demand. Economists have identified a variety of different components that might fullfill this role in practice, including government spending, exports, and debt-financed real-estate investment. For the purposes of illustration, the model here only considers the role of government spending, but it could easily be generalized to include exports and real-estate mortgages as well. 

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

<div className='box'>
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
</div>
    )
}

function xValues(n){
    const arr = [...Array(n)].map((_, x) => x+1);
    return arr;
}

function update(arr1, arr2, n){
    var num = gamma0 + 0.1 * (Math.random() - 0.5);
    var num2 = 0;
    arr1.push(num);
    num2 = arr1.reduce((x, y) => x+y);
    num2 = num2/(2*n);
    arr2.push(num2);


    return num;
}

function f(arr, obj){
    let arr1 = Array(4);
    let lambda = 1/(obj.rho * (1 - obj.theta * (1 - obj.tau) * (1 - obj.psi)));
    let u = lambda * (arr[0] + arr[1] + arr[2]);
    let r = (1 - obj.tau) * (1 - obj.psi) * obj.rho * u;
    let g = arr[1] + obj.theta * r;
    let phi = obj.eta * arr[1] * (obj.capB - arr[1]);

    arr1[0] = arr[0] * (obj.gamma - g + obj.delta);
    arr1[1] = phi * (u - obj.ud);
    arr1[2] = arr[2] * (obj.xi * (arr[3] - obj.sigma * u) - g + obj.delta);
    arr1[3] = (1 - obj.tau) * (u + obj.i * arr[3]) - arr[2] - g - arr[3] * (g - obj.delta);

    return arr1;
}

function rk(arr){
    return null;
}

function reducer(state, action){
    switch(action.type) {
        case "run":
            return {...state, isRunning: true };
        case "stop":
            return {...state, isRunning: false};
        case "reset":
            return {...state, isRunning: false, time: 0, govHatVals: [], govHatAve: []};
        case "iterate":
            return {...state, time: state.time + 1, gamma: update(state.govHatVals, state.govHatAve, state.time + 1), govHatVals: state.govHatVals, govHatAve: state.govHatAve};
        default:
            throw new Error();
    }
}