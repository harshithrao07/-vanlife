import React from "react";
import { Link } from "react-router-dom";

export default function About() {
    return (
        <main className="about--main">
            <img className="about--image" src="/images/about.jpg" />
            <div className="about--texts">
                <h1>Don’t squeeze in a sedan when you<br />could relax in a van.</h1>
                <p>Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch.
                    <br/>(Hitch costs extra 😉)<br />Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
                <Link className="home--link" to="/vans">Find your van</Link>
            </div>
        </main>
    )
}