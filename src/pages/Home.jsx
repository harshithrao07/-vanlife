import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return(
        <main className="home--main">
            <h1 className="home--title">You got the travel plans, we<br />got the travel vans.</h1>
            <p className="home--para">Add adventure to your life by joining the #vanlife movement.<br />Rent the perfect van to make your perfect road trip.</p>
            <Link className="home--link">Find your van</Link>
        </main>
    )
}