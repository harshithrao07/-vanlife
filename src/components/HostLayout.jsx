import React from "react"
import { NavLink, Outlet } from "react-router-dom"

export default function HostLayout() {

    const styles = {
        fontWeight: "bold",
        paddingBottom: "2px",
        borderBottom: "2px solid white",
        color: "white"
    }

    return(
        <>
            <header className="hostlayout--nav">
                <nav>
                    <NavLink end style={({ isActive }) => isActive ? styles : null} to=".">Dashboard</NavLink>
                    <NavLink style={({ isActive }) => isActive ? styles : null} to="vans">Vans</NavLink>
                </nav>
            </header>
            <Outlet />
        </>
    )
}