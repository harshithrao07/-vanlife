import React from "react"
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans , { loader as vansLoader } from "./pages/vans/Vans"
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
import Error from "./pages/Error"
import FetchError from "./pages/FetchError"
import "../server"
import Login from "./pages/Login"

const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="vans" element={<Vans />} loader={vansLoader} errorElement={<FetchError />} />
        <Route path="vans/:id" element={<VanDetails />}/>
        <Route path="login" element={<Login />} />

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
))

export default function App() {
    return (
        <RouterProvider router={router} />
    )
}