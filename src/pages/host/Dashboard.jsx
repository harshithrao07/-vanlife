import React, { Suspense, useEffect, useState } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";
import { getEmailFromAuthState } from "../../../utils";


export default function Dashboard() {
    const dataPromise = useLoaderData();

    const [email, setEmail] = useState(null);

    useEffect(() => {
        async function fetchEmail() {
            const email = await getEmailFromAuthState();
            setEmail(email.split('@')[0]);
        }

        fetchEmail();
    }, []);


    function renderVanElements(vans) {
        let vanElements = null
        if (vans.length > 0) {
            vanElements = vans.map(van => (
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
        }
        else {
            vanElements = <h2 style={{ textAlign: "center" }}>You have no listed vans&nbsp;<i className="fa-regular fa-face-sad-tear"></i></h2>
        }
        return (
            <div>
                {vanElements}
            </div>
        )
    }

    function totalPrice(vans) {
        let total = 0
        const vanPrices = vans.map((van) => {
            total = total + van.price
            return total
        })

        return (
            <p><strong>${total}</strong></p>
        )
    }


    return (
        <main className="dashboard--main">
            <div className="welcome--dashboard">
                <h1>Heyy,&nbsp;<strong>{email}</strong> !</h1>
                <div>
                    <p>Total Cost of your Listed Vans:</p>
                    <Suspense fallback={<p>Calculating your total cost...</p>}>
                        <Await resolve={dataPromise.hostVans}>
                            {totalPrice}
                        </Await>
                    </Suspense>
                </div>
            </div>
            <div className="review--board">
                <p>Review score: <i class="fa-solid fa-star" style={{ color: "#ffc800" }}></i>5.0<h6>/5</h6></p>
            </div>
            <div className="listed--vans">
                <div className="dashboard-listed-vans-title">
                    <h2>Your listed vans</h2>
                    <Link to="vans">View All</Link>
                </div>
                <Suspense fallback={<h2>Loading vans...</h2>}>
                    <Await resolve={dataPromise.hostVans}>
                        {renderVanElements}
                    </Await>
                </Suspense>
            </div>
        </main>
    )
}