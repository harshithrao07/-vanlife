import React, { Suspense } from "react";
import { Link, useLocation, useLoaderData, defer, Await, useNavigate } from "react-router-dom";
import { addNewListedVan, checkIfListed, getVan } from "../../api";
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

let data = null
export async function loader({ params }) {
    const email = await getEmailFromAuthState()
    data = await checkIfListed(email, params.id)
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
        if (authUser) {
            if (!data) {
                try {
                    const van = await vanPromise
                    const { email } = authUser

                    await addNewListedVan(van, email)

                    navigate(".", {replace: true})
                } catch (error) {
                    console.error("Error handling van promise:", error)
                }
            }
            else {
                alert("You have already added this van to your list.")
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
                    <button className="home--link" onClick={() => handleClick(dataPromise.van)}>{data ? <>Added to list&nbsp;&nbsp;<i class="fa-solid fa-heart" style={{ color: "#e72323"}}></i></> : "Add to list"}</button>
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