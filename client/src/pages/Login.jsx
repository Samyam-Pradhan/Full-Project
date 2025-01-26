import { useState } from "react";
import registerImage from "../images/facemask1.webp";
import "../assets/login.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../store/auth";

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const { storeTokenInLS} = useAuth();
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
                alert("Login sucessful");
                const res_data = await response.json();
               
                //stored the token in local host
                storeTokenInLS(res_data.token);
               
                
                setUser({ email: "", password: "" });
                
                navigate("/dashboard");
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
                                    <p className="register-link">
                                    <Link to="/register" className="link">
                                        Dont have an account?
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
};

export default Login;
