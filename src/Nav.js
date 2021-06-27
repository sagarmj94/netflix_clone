import React, { useState, useEffect } from 'react'
import "./Nav.css"

const Nav = () => {

    const [show, handleShow] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);

            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll")
        }

    }, []);
    return (
        <div className={`Nav ${show && "nav_black"}`}>
            <img className="nav_logo"
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo" />
            <img className="nav_avtar"
                src="https://pbs.twimg.com/media/CW2i0pJW4AEYFI3?format=png&name=360x360"
                alt=" Netflix Logo" />

        </div>
    )
}

export default Nav
