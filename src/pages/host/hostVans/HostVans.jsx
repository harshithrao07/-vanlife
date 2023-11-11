import React, { Suspense } from "react";
import { Await, Link, defer, useLoaderData } from "react-router-dom";
import { getHostVans, removeListedVan } from "../../../api";
import { requireAuth } from "../../../../utils";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth()

function getEmailFromAuthState() {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user.email)
                unsubscribe()
            } else {
                resolve(null)
            }
        });
    });
}

export async function loader({ request }) {
    await requireAuth(request)

    const email = await getEmailFromAuthState()
    return defer({ hostVans: getHostVans(email) })
}

export default function HostVans() {
    const dataPromise = useLoaderData()

    async function handleClick(id, event) {
        event.preventDefault();
        event.stopPropagation();
        const email = await getEmailFromAuthState()
        removeListedVan(id,email)
    }

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
                    <div className="trash-icon" onClick={(event) => handleClick(van.id, event)}>
                        <i className="fa-solid fa-trash trash"></i>
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