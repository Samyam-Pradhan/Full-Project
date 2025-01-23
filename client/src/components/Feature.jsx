import { IoMdQrScanner } from "react-icons/io";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { FaUserGear } from "react-icons/fa6";
import { LuBrain } from "react-icons/lu";
import feature from "../images/feature.svg";
import '../assets/Feature.css'; 
export const Feature = () => {
  return (
    <div className="feature">
      <center>
        <h1>Our Features</h1>
      </center>
      <div className="feature-content">
        <div className="feature-text">
          <div className="feature-item">
            <IoMdQrScanner size={50} className="feature-icon" />
            <h3>Real Time Detection</h3>
            <p>
              Instantly detects whether a person is wearing a mask using a live
              video feed.
            </p>
          </div>
          <div className="feature-item">
            <IoShieldCheckmarkSharp size={50} className="feature-icon" />
            <h3>High Accuracy</h3>
            <p>
              Built with a robust Convolutional Neural Network (CNN) to ensure
              accurate detection of face masks.
            </p>
          </div>
          <div className="feature-item">
            <FaUserGear size={50} className="feature-icon" />
            <h3>Easy to Use</h3>
            <p>Simple and intuitive user interface with minimal setup required.</p>
          </div>
          <div className="feature-item">
            <LuBrain size={50} className="feature-icon" />
            <h3>AI-Powered</h3>
            <p>
              Leverages advanced machine learning algorithms for intelligent
              decision-making.
            </p>
          </div>
        </div>
        <div className="feature-image">
          <img src={feature} alt="Feature visualization" />
        </div>
      </div>
    </div>
  );
};
