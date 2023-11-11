import React, { Suspense } from "react";
import { Link, useLocation, useLoaderData, defer, Await, useNavigate } from "react-router-dom";
import { addNewListedVan, auth, getVan } from "../../api";
import { onAuthStateChanged } from "firebase/auth";

export function loader({ params }) {
    return defer({ van: getVan(params.id) })
}

export default function VanDetails() {
    const [authUser, setAuthUser] = React.useState(null)

    const location = useLocation()
    const navigate = useNavigate()
    const pathname = window.location.href

    const dataPromise = useLoaderData()

    const search = location.state?.search || ""
    const type = location.state?.type || "all"

    React.useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        })

        return () => {
            listen()
        }
    }, [])

    async function handleClick(vanPromise) {
        if (authUser)
        {
            try {
                const van = await vanPromise
                const { email } = authUser

                await addNewListedVan(van,email)

            } catch (error) {
                console.error("Error handling van promise:", error)
            }
        } else {
            navigate(`/login?message=You must log in first.&redirectTo=${pathname}`)
        }
    }

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
                    <button className="home--link" onClick={() => handleClick(dataPromise.van)}>Add to list</button>
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