import { Link } from "react-router-dom";
import '../assets/Navbar.css';
export const Navbar = () =>{
    return (
        <header>
            <div className="container">
                <div className="grid navbar-grid">
                    <div className="logo">
                    <h2>Face Mask</h2>
                    </div>
                    <nav>
                        <ul>
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <a href="#">Feature</a>
                            </li>
                            <li>
                                <a href="#">Team</a>
                            </li>
                            <li>
                            <Link to="/login">Login</Link> 
                            </li>
                            <li>
                            <Link to="/register">SignUp</Link> 
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
    
};