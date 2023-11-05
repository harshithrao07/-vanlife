import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { Form, useActionData } from "react-router-dom";
import { auth } from "../api";

export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const password_confirm = formData.get("password_confirm")
    console.log(email, password)

    if (password_confirm === password) {
        async function createUserWithEmailAndPasswordAsync(auth, email, password) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log(userCredential);
            } catch (error) {
                console.log(error);
            }
        }

        createUserWithEmailAndPasswordAsync(auth, email, password);
    }
    else {
        return "Password do not match"
    }

    return null
}

export default function Signin() {
    const error = useActionData()

    return (
        <>
            <div className="signin--divParent">
                <div className="signin--div1">
                    <img src="/images/people.svg" className="signin--img1" />
                </div>
                <div className="signin--div2">
                    <img src="/images/Sign-Up-Peeps.png" className="signin--img2" />
                </div>
            </div>
            <div className="signin--page">
                <div className="signin-container">
                    <h1>Sign up to create an account</h1>
                    {error && <p>{error}</p>}
                    <Form method="post" className="signin-form" replace>
                        <div className="row">
                            <label htmlFor="email"><p>Email Address:</p></label>
                            <input
                                type="email"
                                name="email"
                                className="signin--input"
                            />
                        </div>

                        <div className="row">
                            <label htmlFor="password"><p>Password:</p></label>
                            <input
                                type="password"
                                name="password"
                                className="signin--input"
                            />
                        </div>

                        <div className="row">
                            <label htmlFor="password"><p>Confirm Password:</p></label>
                            <input
                                type="password"
                                name="password_confirm"
                                className="signin--input"
                            />
                        </div>
                        <button className="login--btn"><p>Sign up!</p></button>
                    </Form>
                </div>
            </div>
        </>
    )
}