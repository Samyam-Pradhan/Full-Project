import { useState } from "react";

import Helper from "../images/help.webp"; // Ensure the image is in the correct path
import "../assets/Help.css"; // Import the custom CSS file

const Help = () => {
  // State to track which FAQ is expanded
  const [activeFAQ, setActiveFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index); // Toggle the FAQ visibility
  };

  return (
    <div className="content-area">
      {/* Background Image */}
      <div className="bg-image-container">
        {/* Optional Overlay */}
        <div className="overlay"></div>

        {/* Heading */}
        <div className="heading">
          <h1 className="title">Help Center</h1>
        </div>
      </div>

      {/* Help Content */}
      <div className="help-content">
        <p className="description">
          Welcome to the Help Center! Here, you&apos;ll find answers to frequently asked questions and guidance on how to use the Face Mask Detection System effectively.
        </p>

        {/* Frequently Asked Questions (FAQ) */}
        <h2 className="section-title">Frequently Asked Questions</h2>

        <div className="faq-list">
          {/* FAQ 1 */}
          <div className="faq-item" onClick={() => toggleFAQ(1)}>
            <div className="faq-question">
              <h3>1. How does the Face Mask Detection system work?</h3>
            </div>
            {activeFAQ === 1 && (
              <div className="faq-answer">
                The system uses deep learning models, such as Convolutional Neural Networks (CNNs), built with TensorFlow and OpenCV, to detect whether individuals are wearing a face mask in real-time using video feeds.
              </div>
            )}
          </div>

          {/* FAQ 2 */}
          <div className="faq-item" onClick={() => toggleFAQ(2)}>
            <div className="faq-question">
              <h3>2. Is the system available for all public places?</h3>
            </div>
            {activeFAQ === 2 && (
              <div className="faq-answer">
                Yes, the system can be deployed in public spaces, businesses, healthcare institutions, and anywhere where mask compliance is necessary for health and safety.
              </div>
            )}
          </div>

          {/* FAQ 3 */}
          <div className="faq-item" onClick={() => toggleFAQ(3)}>
            <div className="faq-question">
              <h3>3. What is the accuracy of the mask detection?</h3>
            </div>
            {activeFAQ === 3 && (
              <div className="faq-answer">
                The system is highly accurate, but performance may vary depending on factors like lighting, angle, and visibility of the face.
              </div>
            )}
          </div>

          {/* FAQ 4 */}
          <div className="faq-item" onClick={() => toggleFAQ(4)}>
            <div className="faq-question">
              <h3>4. Does the system store any personal data?</h3>
            </div>
            {activeFAQ === 4 && (
              <div className="faq-answer">
                No, the system processes video feeds in real-time, ensuring privacy by not storing any personal data or images.
              </div>
            )}
          </div>

          {/* FAQ 5 */}
          <div className="faq-item" onClick={() => toggleFAQ(5)}>
            <div className="faq-question">
              <h3>5. Can the system detect masks in a crowded area?</h3>
            </div>
            {activeFAQ === 5 && (
              <div className="faq-answer">
                Yes, the system can detect masks in a crowded area, but accuracy may reduce with heavy occlusions or low-quality video feeds.
              </div>
            )}
          </div>
        </div>

        {/* Instructions for Use */}
        <h2 className="section-title">How to Use the Face Mask Detection System</h2>
        <ul className="instruction-list">
          <li>Step 1: Position the camera to capture the area where people will be passing through.</li>
          <li>Step 2: Ensure the camera is clear of obstructions for optimal mask detection.</li>
          <li>Step 3: Start the system and view real-time results on the dashboard.</li>
          <li>Step 4: Receive alerts when someone is detected without a mask.</li>
          <li>Step 5: Follow any further instructions or warnings from the system.</li>
        </ul>

        {/* Contact for Support */}
        <h2 className="section-title">Need Further Assistance?</h2>
        <p className="description">
          If you encounter any issues or have additional questions, please contact our support team for assistance:
          <br />
          <a href="mailto:support@facemaskdetection.com" className="contact-link">
            support@facemaskdetection.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Help;
