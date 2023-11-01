import React from "react";
import { Link } from "react-router-dom";

export default function About() {
    return (
        <main className="about--main">
            <div className="title--header about--title">
                <div>
                    <h1>About</h1>
                    <p><Link to="/">Home</Link>  /  About</p>
                </div>
            </div>
            <div className="about--info">
                <div className="about--texts">
                    <h1>Who are we?</h1>
                    <p>Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch.
                        <br/>(Hitch costs extra 😉)<br />Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
                </div>
                <div className="about--image--parent">
                    <img src="/images/about1.png" className="about--image" />
                </div>
            </div>
        </main>
    )
}