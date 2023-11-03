import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";

export default function VanDetails() {

    const params = useParams()
    const location = useLocation()

    const [van, setVan] = React.useState(null)

    React.useEffect(() => {
        fetch(`/api/vans/${params.id}`)
            .then(res => res.json())
            .then(data => setVan(data.vans))
    }, [params.id])

    const search = location.state?.search || ""
    const type = location.state?.type || "all"

    return (
        <div className="vandetails--main">
            {
                van ?
                    <div>
                        <div className="title--header vandetails--title">
                            <div>
                                <h1>{van.name}</h1>
                                <p><Link to="/">Home</Link>  /  <Link to={`..${search}`} relative="path">{type.charAt(0).toUpperCase()+type.slice(1)} Vans</Link>   /  {van.name}</p>
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
                    </div>
                    : <h2>Loading...</h2>
            }
        </div>
    )
}