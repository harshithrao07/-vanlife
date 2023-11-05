import React from "react"
import { Link, useRouteError } from "react-router-dom"

export default function FetchError() {
    const error = useRouteError()
    
    return(
        <div className="error--main">
            <h1>Error: {error.message}</h1>
            <pre>{error.status} - {error.statusText}</pre>
            <Link to="/">Return to home</Link>
        </div>
    )
}