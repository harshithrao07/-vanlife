import React, { Suspense } from "react";
import { useParams, Link, useLocation, useLoaderData, defer, Await } from "react-router-dom";
import { getVan } from "../../api";

export function loader({ params }) {
    return defer({ van: getVan(params.id) })
}

export default function VanDetails() {

    const params = useParams()
    const location = useLocation()

    const dataPromise = useLoaderData()

    const search = location.state?.search || ""
    const type = location.state?.type || "all"

    function renderVanElements(van) {
        return (<div>
            <div className="title--header vandetails--title">
                <div>
                    <h1>{van.name}</h1>
                    <p><Link to="/">Home</Link>  /  <Link to={`..${search}`} relative="path">{type.charAt(0).toUpperCase() + type.slice(1)} Vans</Link>   /  {van.name}</p>
                </div>
            </div>
            <div className="vandetails">
                <div className="vandetails--imgParent">
                    <img src={van.imageUrl} className="vandetails--img" />
                </div>
                <div className="vandetails--description">
                    <p className={`van--type ${van.type}`}>{van.type}</p>
                    <h1>{van.name}</h1>
                    <p>${van.price}<span>/day</span></p>
                    <p className="vandetails--para">{van.description}</p>
                    <Link className="home--link">Rent this van</Link>
                </div>
            </div>
        </div>)
    }

    return (
        <div className="vandetails--main">
            <Suspense fallback={<h2>Loading van...</h2>}>
                <Await resolve={dataPromise.van}>
                    {renderVanElements}
                </Await>
            </Suspense>
        </div>
    )
}