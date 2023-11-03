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
        <div className="login--page">
            <div className="title--header login--title">
                <div>
                    <h1>Sign in to your account!</h1>
                </div>
            </div>
            <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <div className="row">
                    <label for="email">Email Address:</label>
                    <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    />
                </div>

                <div className="row">
                    <label for="password">Password:</label>
                    <input 
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    />
                </div>
                <button><p>Log in</p></button>
            </form>
            </div>
        </div>
    )
}