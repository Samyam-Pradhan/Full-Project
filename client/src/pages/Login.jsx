import { useState } from "react";
import registerImage from "../images/facemask1.webp";
import "../assets/login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                setUser({ email: "", password: "" });
                alert("Login successful");
                navigate("/Dashboard");
            } else {
                alert("Invalid credentials");
                console.log("Invalid credentials");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="login-page">
            <main>
                <div className="container grid grid-two-cols">
                    <div className="left-section">
                        <img
                            src={registerImage}
                            alt="Face Mask"
                            width="100%"
                            height="auto"
                        />
                    </div>
                    <div className="right-section">
                        <div className="form-container">
                            <h1 className="main-heading">Login Form</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="input-container">
                                    <label htmlFor="email" className="label">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        id="email"
                                        required
                                        autoComplete="off"
                                        value={user.email}
                                        onChange={handleInput}
                                        className="input"
                                    />
                                </div>
                                <div className="input-container">
                                    <label htmlFor="password" className="label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        id="password"
                                        required
                                        autoComplete="off"
                                        value={user.password}
                                        onChange={handleInput}
                                        className="input"
                                    />
                                </div>
                                <button type="submit" className="submit-button">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
};

export default Login;
