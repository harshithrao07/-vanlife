import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {

    return (
        <header>
            <nav className="navbar">
                <div>
                    <h1><NavLink to="/" className="navbar--sitelogo">Vanlife</NavLink></h1>
                </div>
                <div className="nav--links">
                    <NavLink className={({ isActive }) => isActive ? "active--link" : null} to="/host">Host</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "active--link" : null} to="/about">About</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "active--link" : null} to="/vans">Vans</NavLink>
                </div>
            </nav>
        </header>
    )

}