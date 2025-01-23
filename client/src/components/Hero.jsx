import '../assets/Hero.css';
import background from '../images/background.png';

export const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-text">
                <h1>Face Mask Detection System</h1>
                <p>Leverage advanced CNN algorithms for real-time detection.</p>
                <a href="#get-started" className="hero-button">Get Started</a>
            </div>
            <div className="hero-image">
                <img src={background} alt="Hero Background" />
            </div>
        </div>
    );
};
