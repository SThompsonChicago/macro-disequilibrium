import React from 'react';

function Sketch() {
  return (
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
      The dynamical processes in this model tend to be destabilizing, so there is no tendency for solutions to move toward equilibria. However, the user can observe that variables do fluctuate around certain trends. The trend growth rate for the sume of exports and government spending is a parameter in the model, with the default value set to 0.03 (i.e., three percent per year). This drives the long-run dynamics of the system; as can be seen when the simulation is run, the long-run average rate of capital accumulation converges to the same value as the long-run average rate of growth for the sum of exports and government spending. On the other hand, the long-run average value for the capacity utilization rate gravitates toward a targetted level.
    </p>
  </div>
  );
}

export default Sketch;