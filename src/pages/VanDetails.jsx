import React from "react";
import { useParams, Link } from "react-router-dom";


export default function VanDetails() {
    const params = useParams();
    const [van, setVan] = React.useState(null)

    React.useEffect(() => {
        fetch(`/api/vans/${params.id}`)
            .then(res => res.json())
            .then(data => setVan(data.vans))
    }, [params.id])

    return (
        <main className="vandetails--main">
            {van ? <div className="vandetails">
                <div className="vandetails--imgParent">
                    <img src={van.imageUrl} className="vandetails--img" />
                </div>
                <div className="vandetails--description">
                    <h2>{van.name}</h2>
                    <p className={`van--type ${van.type}`}>{van.type}</p>
                    <p className="vandetails--price"><strong>${van.price}</strong><span>/day</span></p>
                    <p className="vandetails--para">{van.description}</p>
                    <Link className="home--link">Rent this van</Link>
                </div>
            </div> : <h2>Loading...</h2>}
        </main>
    )
}