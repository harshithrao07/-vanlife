import React from "react";
import { getVans } from "../../api"
import { Link, useLoaderData, useSearchParams } from "react-router-dom";

export function loader() {
    return getVans()
}

export default function Vans() {
    const vans = useLoaderData();

    const [searchParams, setSearchParams] = useSearchParams()

    const typeFilter = searchParams.get("type");

    const filteredVans = typeFilter ? vans.filter(van => van.type.toLowerCase() === typeFilter) : vans

    const vanElements = filteredVans.map(van => (
        <Link to={`/vans/${van.id}`} state={{ search: `?${searchParams.toString()}`, type: typeFilter }} className="van--tile" key={van.id}>
            <div>
                <img src={van.imageUrl} className="van--img" />
                <div className="van--info">
                    <h3>{van.name}</h3>
                    <p className={`van--type ${van.type}`}>{van.type}</p>
                </div>
                <p>${van.price}<span>/day</span></p>
            </div>
        </Link>
    ))

    return (
        <main className="vans--main">
            <div className="title--header vans--title">
                <div>
                    <h1>Vans</h1>
                    <p><Link to="/">Home</Link>  /  Vans</p>
                </div>
            </div>
            <h1>Explore our van options</h1>
            <div className="filter-types">
                <button
                    className={`filter-type ${typeFilter === "simple" ? "Simple" : null}`}
                    onClick={() => setSearchParams({ type: "simple" })}
                >
                    Simple
                </button>
                <button
                    className={`filter-type ${typeFilter === "rugged" ? "Rugged" : null}`}
                    onClick={() => setSearchParams({ type: "rugged" })}
                >
                    Rugged
                </button>
                <button
                    className={`filter-type ${typeFilter === "luxury" ? "Luxury" : null}`}
                    onClick={() => setSearchParams({ type: "luxury" })}
                >
                    Luxury
                </button>
                {typeFilter && <button
                    className="clear-filter"
                    onClick={() => setSearchParams({})}
                >
                    Clear filter
                </button>}
            </div>
            <div className="vans--tiles">
                {vanElements}
            </div>
        </main>
    )
}