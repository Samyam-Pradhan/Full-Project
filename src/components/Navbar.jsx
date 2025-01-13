import './Navbar.css';
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
                                <a href="../pages/LoginPage">Login</a>
                            </li>
                            <li>
                                <a href="" id="SignUp">SignUp</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
    
};