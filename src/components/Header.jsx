import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../api";

export default function Header() {
    const [authUser, setAuthUser] = useState(null)
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("loggedin")

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if(user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        })

        return () => {
            listen()
        }
    }, [])

    async function handleClick() {
        try {
            const data = await signOut(auth)
            localStorage.setItem("loggedin",false)
        } catch (err) {
            console.log(err)
        } finally {
            navigate("/");
        }
    }

    return (
        <header>
            <nav className="navbar">
                <div>
                    <h1><NavLink to="/" className="navbar--sitelogo">Vanlife</NavLink></h1>
                </div>
                <div className="nav--links">
                    { isLoggedIn && authUser && <NavLink className={({ isActive }) => isActive ? "active--link" : null} to="/host">Host</NavLink>}
                    <NavLink className={({ isActive }) => isActive ? "active--link" : null} to="/about">About</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "active--link" : null} to="/vans">Vans</NavLink>
                    {authUser ? <div className="login"><NavLink onClick={handleClick}>Logout</NavLink></div> : <NavLink className="login" to="/login">Login</NavLink>}
                </div>
            </nav>
        </header>
    )

}