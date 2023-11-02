import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="home--page">
            <main className="home--main">
                <div className="home--texts">
                    <h1 className="home--title">You got the travel plans, we got the travel vans.</h1>
                    <p className="home--para">Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.</p>
                    <Link className="home--link" to="/vans">Find your van</Link>
                </div>
            </main>

            <div className="home--page--section2">
                <div>
                    <h2>What is #vanlife</h2>
                    <p>Vanlife is a lifestyle that involves living in a van, truck, or other vehicle.</p>
                    <Link to="about">Read More<i class="fa-solid fa-arrow-right"></i></Link>
                </div>
                <div>
                    <h2>What is #vanlife</h2>
                    <p>Vanlife is a lifestyle that involves living in a van, truck, or other vehicle.</p>
                    <Link to="about">Read More<i class="fa-solid fa-arrow-right"></i></Link>
                </div>
                <div>
                    <h2>What is #vanlife</h2>
                    <p>Vanlife is a lifestyle that involves living in a van, truck, or other vehicle.</p>
                    <Link to="about">Read More<i class="fa-solid fa-arrow-right"></i></Link>
                </div>
            </div>

            <main className="home--about">
                <div className="about--info">
                    <div className="about--texts home--about--texts">
                        <h1>What is #vanlife?</h1>
                        <p>Vanlife is a lifestyle that involves living in a van, truck, or other vehicle. It is a way of life that allows you to travel and explore the world while living in a small space.</p>
                        <p>Vanlife is a way to live a more minimalistic lifestyle, and to be more in tune with nature. Vanlife is a way to live a more adventurous life.</p>
                    </div>
                    <div className="about--image--parent">
                        <img src="/images/home.jpg" className="about--image" />
                    </div>
                </div>
            </main>
        </div>
    )
}