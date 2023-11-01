import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans from "./pages/vans/Vans"
import VanDetails from "./pages/vans/VanDetails"
import Layout from "./components/Layout"
import Dashboard from "./pages/host/Dashboard"
import Income from "./pages/host/Income"
import Reviews from "./pages/host/Reviews"
import HostLayout from "./components/HostLayout"
import HostVans from "./pages/host/hostVans/HostVans"
import HostVansDetails from "./pages/host/hostVans/HostVansDetails"
import HostVanInfo from "./pages/host/hostVans/HostVanInfo"
import HostVanPricing from "./pages/host/hostVans/HostVanPricing"
import HostVanPhotos from "./pages/host/hostVans/HostVanPhotos"
import "../server"
import Error from "./pages/Error"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="vans" element={<Vans />} />
                    <Route path="vans/:id" element={<VanDetails />} />


                    <Route path="host" element={<HostLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="income" element={<Income />} />
                        <Route path="reviews" element={<Reviews />} />
                        <Route path="vans" element={<HostVans />} />
                        <Route path="vans/:id" element={<HostVansDetails />}>
                            <Route index element={<HostVanInfo />} />
                            <Route path="pricing" element={<HostVanPricing />} />
                            <Route path="photos" element={<HostVanPhotos />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}