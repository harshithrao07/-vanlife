import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { Form, useLoaderData, redirect, useActionData, useNavigation, Link } from "react-router-dom";
import { auth } from "../api";

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}

export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"

    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)
        localStorage.setItem("loggedin", true)
        return redirect(pathname)
    } catch(err) {
        return err.message
    }
}

export default function Login() {
    const message = useLoaderData()
    const navigation = useNavigation()
    const error = useActionData()

    return (
        <div className="login--page">
            <div className="login-container">
                <div className="login--title">
                    <h2>Log in to your account.</h2>
                    {message && <p>{message}</p>}
                    {error && <p>{error}</p>}
                </div>
                <Form method="post" className="login-form" replace>
                    <div className="row">
                        <label htmlFor="email"><p>Email Address:</p></label>
                        <input
                            type="email"
                            name="email"
                        />
                    </div>

                    <div className="row">
                        <label htmlFor="password"><p>Password:</p></label>
                        <input
                            type="password"
                            name="password"
                        />
                    </div>
                    <button className="login--btn" disabled={navigation.state === "submitting"}><p>{navigation.state === "idle" ? "Log in" : "Logging in..."}</p></button>
                    <Link to="/signin"><p>Create Account</p></Link>
                </Form>
            </div>
        </div>
    )
}