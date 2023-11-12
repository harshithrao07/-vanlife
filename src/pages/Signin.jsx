import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import { auth } from "../api";

export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const password_confirm = formData.get("password_confirm")

    if(password === password_confirm) {
        try{
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            localStorage.setItem("loggedin", true)
            return redirect("/host")
        } catch(err) {
            return err.message
        }
    } else {
        return "Password do not match"
    }
}

export default function Signin() {
    const error = useActionData()

    return (
        <>
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
                        <div className="signin--btnParent"><button className="login--btn"><p>Sign up!</p></button></div>
                    </Form>
                </div>
            </div>
        </>
    )
}