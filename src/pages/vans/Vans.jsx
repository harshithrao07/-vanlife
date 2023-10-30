import React from "react";
import { Link } from "react-router-dom";

export default function Vans() {
    const [vans, setVans] = React.useState([])

    React.useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setVans(data.vans))
    }, [])
    
    const vanElements = vans.map(van => (
        <Link to={`/vans/${van.id}`} className="van--tile" key={van.id}>
            <div>
                <img src={van.imageUrl} className="van--img" />
                <div className="van--info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <p className={`van--type ${van.type}`}>{van.type}</p>
            </div>
        </Link>
    ))

    return(
        <main className="vans--main">
            <h1>Explore our van options</h1>
            {vans.length>0 ? <div className="vans--tiles">
                {vanElements}
            </div> : <h3>Loading...</h3>}
        </main>
    )
}