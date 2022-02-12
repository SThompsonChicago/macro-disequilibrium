import React from 'react';

function About() {
    return (
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
    );
}

export default About;