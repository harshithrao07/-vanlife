import React from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans from "./pages/Vans"
import VanDetails from "./pages/VanDetails"

import "../server"

export default function App() {
    return (
        <BrowserRouter>
            <header>
                <nav className="navbar">
                    <Link to="/" className="navbar--sitelogo">#vanlife</Link>
                    <Link to="/about" className="navbar--links">About</Link>
                    <Link to="/vans" className="navbar--links">Vans</Link>
                </nav>
            </header>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/vans" element={<Vans />} />
                <Route path="/vans/:id" element={<VanDetails />} />
            </Routes>
            <footer>
                <p>Ⓒ 2023 #VANLIFE</p>
            </footer>
        </BrowserRouter>
    )
}