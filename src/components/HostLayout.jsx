import React from "react"
import { NavLink, Outlet } from "react-router-dom"

export default function HostLayout() {

    const styles = {
        fontWeight: "bold",
        paddingBottom: "2px",
        borderBottom: "2px solid black",
        color: "#161616"
    }

    return(
        <>
            <header style={{padding:"0 50px"}}>
                <nav>
                    <NavLink end style={({ isActive }) => isActive ? styles : null} to=".">Dashboard</NavLink>
                    <NavLink style={({ isActive }) => isActive ? styles : null} to="income">Income</NavLink>
                    <NavLink style={({ isActive }) => isActive ? styles : null} to="reviews">Reviews</NavLink>
                    <NavLink style={({ isActive }) => isActive ? styles : null} to="vans">Vans</NavLink>
                </nav>
            </header>
            <Outlet />
        </>
    )
}