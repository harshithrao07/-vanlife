import React from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";

export default function HostVansDetails() {
    const [van, setVan] = React.useState(null)
    const params = useParams();

    React.useEffect(() => {
        fetch(`/api/host/vans/${params.id}`)
            .then(res => res.json())
            .then(data => setVan(data.vans))
    }, [params.id])

    if (!van) {
        return <h1 className="vans--main">Loading...</h1>
    }

    return (
        <>
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr;&nbsp;<span>Back to all vans</span></Link>

            <section className="hostvan--detailsParent">
                <div className="hostvan--details">
                    <div className="hostvandetails--imgParent">
                        <img src={van.imageUrl} className="hostvan--img" />
                    </div>
                    <div className="hostvandetails--info">
                        <p className={`van--type ${van.type}`}>{van.type}</p>
                        <h1>{van.name}</h1>
                        <h3 className=""><strong>${van.price}</strong><span>/day</span></h3>
                    </div>
                </div>

                <header>
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