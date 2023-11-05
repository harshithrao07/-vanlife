import React, { Suspense } from "react";
import { Await, Link, NavLink, Outlet, defer, useLoaderData, useParams } from "react-router-dom";
import { getVan } from "../../../api";
import { requireAuth } from "../../../../utils";

export async function loader({ params, request }) {
    await requireAuth(request)
    return defer({ hostVan: getVan(params.id) }) 
}

export default function HostVansDetails() {
    const dataPromise = useLoaderData()

    const params = useParams();

    function renderVanElements(van) {
        return(
            <>
                <div className="title--header hostvans--title">
                    <div>
                        <h1>{van.name}</h1>
                        <p><Link to="/">Home</Link>  /  <Link to="/host">Host</Link>  /  <Link to="/host/vans">Vans</Link>  /  {van.name}</p>
                    </div>
                </div>

                <section className="hostvan--detailsParent">
                    <div className="hostvan--details">
                        <div className="hostvandetails--imgParent">
                            <img src={van.imageUrl} className="hostvan--img" />
                        </div>
                        <div className="hostvandetails--info">
                            <p className={`van--type ${van.type}`}>{van.type}</p>
                            <h1>{van.name}</h1>
                            <p>${van.price}<span>/day</span></p>
                        </div>
                    </div>

                    <header className="hostlayout--nav">
                        <nav>
                            <NavLink end to="." className={({ isActive }) => isActive ? "active--link" : null}>
                                Details
                            </NavLink>
                            <NavLink to="pricing" className={({ isActive }) => isActive ? "active--link" : null}>
                                Pricing
                            </NavLink>
                            <NavLink to="photos" className={({ isActive }) => isActive ? "active--link" : null}>
                                Photos
                            </NavLink>
                        </nav>
                    </header>


                    <Outlet context={{ van }} />
                </section>
            </>
        )
    }

    return (
        <div className="hostvandetails--page">
            <Suspense fallback={<h2>Loading van...</h2>}>
                <Await resolve={dataPromise.hostVan}>
                    {renderVanElements}
                </Await>
            </Suspense>
        </div>
    )
}