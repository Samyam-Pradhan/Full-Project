import bgImage from "../images/bgImage.webp"; // Ensure the image is in the correct path
import "../assets/About.css"; // Import the custom CSS file

const About = () => {
  return (
    <div className="content-area">
      {/* Background Image */}
      <div className="bg-image-container" style={{ backgroundImage: `url(${bgImage})` }}>
        {/* Optional Overlay */}
        <div className="overlay"></div>

        {/* Heading */}
        <div className="heading">
          <h1 className="title">About Face Mask Detection System</h1>
        </div>
      </div>

      {/* About Content */}
      <div className="about-content">
        <p className="description">
          This real-time face mask detection system helps monitor mask usage in public spaces to ensure compliance with health guidelines and promote safety.
        </p>

        {/* Key Features */}
        <div className="section">
          <h2 className="section-title">Key Features</h2>
          <ul className="feature-list">
            <li>Real-Time Mask Detection</li>
            <li>High Detection Accuracy</li>
            <li>Live Camera Feed Integration</li>
            <li>Alert System for Non-Mask Detection</li>
            <li>Easy-to-Use Interface</li>
          </ul>
        </div>

        {/* Technology */}
        <div className="section">
          <h2 className="section-title">Technology</h2>
          <p className="section-content">
            The system uses deep learning models like Convolutional Neural Networks (CNNs), built with TensorFlow and OpenCV, to accurately detect if a person is wearing a mask in real-time.
          </p>
        </div>

        {/* Applications */}
        <div className="section">
          <h2 className="section-title">Applications</h2>
          <p className="section-content">
            This system is perfect for deployment in public spaces, businesses, and healthcare institutions to ensure mask compliance and public health safety.
          </p>
        </div>

        {/* Privacy & Security */}
        <div className="section">
          <h2 className="section-title">Privacy & Security</h2>
          <p className="section-content">
            The system does not store any personal data and processes video feeds in real-time to ensure the privacy and security of all users.
          </p>
        </div>

        {/* Future Updates */}
        <div className="section">
          <h2 className="section-title">Future Updates</h2>
          <p className="section-content">
            We are working to enhance the system with additional features like social distancing detection and facial temperature monitoring to further promote safety.
          </p>
        </div>

        {/* Credits */}
        <div className="section">
          <h2 className="section-title">Credits</h2>
          <p className="section-content">
            Special thanks to our development team, open-source contributors, and data providers for making this project possible.
          </p>
        </div>

        {/* Contact */}
        <div className="section">
          <h2 className="section-title">Contact</h2>
          <p className="section-content">
            If you have any questions or inquiries, please contact us at:
            <br />
            <a href="mailto:support@facemaskdetection.com" className="contact-link">
              support@facemaskdetection.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
