import React, { Suspense } from "react";
import { Await, Link, defer, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../../api";
import { requireAuth } from "../../../../utils";

export async function loader({ request }) {
    await requireAuth(request)
    return defer({ hostVans: getHostVans() })
}

export default function HostVans() {
    const dataPromise = useLoaderData()

    function renderVanElements(vans) {
        const vanElements = vans.map(van => (
            <Link to={`/host/vans/${van.id}`} key={van.id}>
                <div className="hostvan--tile">
                    <div className="hostvan--imgParent">
                        <img src={van.imageUrl} className="hostvan--img" />
                    </div>
                    <div className="hostvan--infoParent">
                        <h3>{van.name}</h3>
                        <p>${van.price}<span>/day</span></p>
                    </div>
                </div>
            </Link>
        ))
        return (
            <div>
                {vanElements}
            </div>
        )
    }

    return (
        <main className="hostvans--main">
            <h1>Your listed vans</h1>
            <Suspense fallback={<h2>Loading vans...</h2>}>
                <Await resolve={dataPromise.hostVans}>   
                    {renderVanElements}
                </Await>
            </Suspense>
        </main>
    )
}