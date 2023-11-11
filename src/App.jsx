import React from "react"
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans , { loader as vansLoader } from "./pages/vans/Vans"
import VanDetails, { loader as vanDetailsLoader} from "./pages/vans/VanDetails"
import Layout from "./components/Layout"
import Dashboard from "./pages/host/Dashboard"
import Income from "./pages/host/Income"
import Reviews from "./pages/host/Reviews"
import HostLayout from "./components/HostLayout"
import HostVans, { loader as hostVansLoader } from "./pages/host/hostVans/HostVans"
import HostVansDetails, { loader as hostVanDetailsLoader } from "./pages/host/hostVans/HostVansDetails"
import HostVanInfo from "./pages/host/hostVans/HostVanInfo"
import HostVanPricing from "./pages/host/hostVans/HostVanPricing"
import HostVanPhotos from "./pages/host/hostVans/HostVanPhotos"
import Error from "./pages/Error"
import FetchError from "./pages/FetchError"
import Login, { loader as loginLoader, action as loginAction } from "./pages/Login"
import Signin, { action as signinAction} from "./pages/Signin"

import { requireAuth } from "../utils"

const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="vans" element={<Vans />} loader={vansLoader} errorElement={<FetchError />} />
        <Route path="vans/:id" element={<VanDetails />} loader={vanDetailsLoader} errorElement={<FetchError />} />
        <Route path="login" element={<Login />} loader={loginLoader} action={loginAction} />
        <Route path="signin" element={<Signin />} action={signinAction} />

        <Route path="host" element={<HostLayout />}>
            <Route index element={<Dashboard />} loader={async({request}) => await requireAuth(request)} />
            <Route path="income" element={<Income />} loader={async ({request}) => await requireAuth(request)} />
            <Route path="reviews" element={<Reviews />} loader={async ({request}) => await requireAuth(request)} />
            <Route path="vans" element={<HostVans />} loader={hostVansLoader} errorElement={<FetchError />} />
            <Route path="vans/:id" element={<HostVansDetails />} loader={hostVanDetailsLoader} errorElement={<FetchError />} >
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