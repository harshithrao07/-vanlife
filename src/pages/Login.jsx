import React from "react";

export default function Login() {
    const [formData, setFormData] = React.useState({
        email: "",
        password: ""
    })

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name] : value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(formData)
    }

    return(
        <div className="login-container">
            <h1>Sign in to your account</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Email Address"
                value={formData.email}
                 />
                 <input 
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                value={formData.password}
                 />
                <button><p>Log in</p></button>
            </form>
        </div>
    )
}