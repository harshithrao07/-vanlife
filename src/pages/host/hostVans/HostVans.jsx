import React from "react";
import { Link } from "react-router-dom";

export default function HostVans() {
    const [vans, setVans] = React.useState([])

    React.useEffect(() => {
        fetch('/api/host/vans')
            .then(res => res.json())
                .then(data => setVans(data.vans))
    }, [])

    const vanElements = vans.map(van => (
        <Link to={`/host/vans/${van.id}`} key={van.id}>
            <div className="hostvan--tile">
                <div className="hostvan--imgParent">
                    <img src={van.imageUrl} className="hostvan--img" />
                </div>
                <div className="hostvan--infoParent">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
            </div>
        </Link>
    ))

    return(
        <main className="hostvans--main">
            <h1>Your listed vans</h1>
            {vans.length>0 ? <div>
                {vanElements}
            </div> : <h3>Loading...</h3>}
        </main>
    )
}