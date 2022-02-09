import React from 'react';

const styles = {
    space: {
        margin: "5px",
    },
    top: {
        borderTop: "0px",
    },
    arr: {
        cursor: 'default',
    },
    center: {
        float: "center",
    }
}

function Footer() {
    return (
        <div className="notification is-black">
            <footer className="footer notification is-black has-text-centered">
                <p>Created by <a href="https://sgthompson.herokuapp.com/">Stephen Thompson</a>. </p>
            </footer>
        </div>
    );
}

export default Footer;