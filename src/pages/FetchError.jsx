import React from "react"
import { Link } from "react-router-dom"

export default function FetchError() {
    return(
        <div className="error--main">
            <h1>An error occurred while fetching the data</h1>
            <Link to="/">Return to home</Link>
        </div>
    )
}