import React from 'react';

function Discussion() {
  return (
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
  );
}

export default Discussion;