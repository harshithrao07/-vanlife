import React from "react"
import { BrowserRouter, Routes, Route, Link} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"

export default function App() {
    return(
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
            </Routes>
            <footer>
                <p>Ⓒ 2023 #VANLIFE</p>
            </footer>
        </BrowserRouter>
    )
}