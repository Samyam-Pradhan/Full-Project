import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/Register.css";

const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });
const navigate = useNavigate();
    // Handling input values
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    // Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        try {
            const response = await fetch(`http://localhost:5000/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if(response.ok){
                setUser({
                    username: "",
                    email: "",
                    password: "",
                })
                navigate("/login");
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        
                            <div className="register-form">
                                <h1 className="main-heading mb-3">Registration Form</h1>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="username"
                                            id="username"
                                            required
                                            autoComplete="off"
                                            value={user.username}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="email"
                                            id="email"
                                            required
                                            autoComplete="off"
                                            value={user.email}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="password"
                                            id="password"
                                            required
                                            autoComplete="off"
                                            value={user.password}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-submit">
                                        Register now
                                    </button>
                                </form>
                           
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};

export default Register;
