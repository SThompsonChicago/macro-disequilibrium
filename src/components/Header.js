import React from 'react';

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
}

function Header() {
  return (
    <div className="is-black">
      <section className="hero notification is-black is-size-6-mobile">
        <div className="hero-body">
          <article className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/86/Rosa_Luxemburg_NYPL.jpg" alt="Image" />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-size-6-mobile">
                Macroeconomic Disequilibrium Simulator
              </p>
              <p className="subtitle is-size-6-mobile">
                Using time averages to understand long-run dynamics
              </p>
            </div>
          </article>
        </div>
      </section>

    </div>
  );
}

export default Header;