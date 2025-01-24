import React, { useRef, useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is imported for making HTTP requests
import "../assets/Camera.css";

const CameraApp = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null); // Reference for the canvas
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [detectionResults, setDetectionResults] = useState(null);

  // Start the camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Unable to access the camera. Please check your permissions.");
    }
  };

  // Stop the camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      let tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    // Clear the canvas
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas content
    }

    // Reset detection results
    setDetectionResults(null);

    setIsCameraOn(false);
  };

  // Capture video frame and send to FastAPI for mask detection
  const captureAndDetectMask = async () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Draw the current video frame onto the canvas
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Convert canvas image to base64 format
      const imageUrl = canvas.toDataURL("image/jpeg");

      try {
        // Send the base64 image to the FastAPI backend for mask detection
        const response = await axios.post(
          "http://localhost:8000/detect-mask/",
          {
            image: imageUrl, // Send the image as a base64 string
          }
        );

        console.log(response);

        // Store the results (e.g., mask detection predictions)
        setDetectionResults(response.data.results); // Set results from API response
      } catch (error) {
        console.error("Error sending frame to backend:", error);
      }
    }
  };

  // Periodically capture and send frames to backend
  useEffect(() => {
    const interval = setInterval(() => {
      if (isCameraOn) {
        captureAndDetectMask();
      }
    }, 500); // Capture frame every 1 second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isCameraOn]);

  // Function to draw the bounding box on the canvas based on the received coordinates
  const drawBoundingBoxes = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!videoRef.current) return;

    // Match canvas dimensions to video
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    // Draw bounding boxes
    if (detectionResults) {
      detectionResults.forEach((result) => {
        const [startX, startY, endX, endY] = result.box;
        const isNormalized = startX <= 1 && startY <= 1 && endX <= 1 && endY <= 1;

        let scaledStartX = startX;
        let scaledStartY = startY;
        let scaledWidth = endX - startX;
        let scaledHeight = endY - startY;

        if (isNormalized) {
          // Scale normalized coordinates to actual pixel values
          scaledStartX *= canvas.width;
          scaledStartY *= canvas.height;
          scaledWidth *= canvas.width;
          scaledHeight *= canvas.height;
        }

        // Set colors based on detection label
        const isWearingMask =
          result.label.toLowerCase().includes("mask") &&
          !result.label.toLowerCase().includes("no mask");
        const strokeColor = isWearingMask ? "green" : "red";
        const textColor = strokeColor;

        // Draw rectangle
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 3;
        ctx.strokeRect(scaledStartX + 115, scaledStartY, scaledWidth, scaledHeight - 10);

        // Add label
        ctx.fillStyle = textColor;
        ctx.font = "16px Arial";
        ctx.fillText(
          `${result.label}`,
          scaledStartX,
          scaledStartY > 10 ? scaledStartY - 10 : scaledStartY + 20
        );
      });
    }
  };

  // Update canvas whenever detection results change
  useEffect(() => {
    if (detectionResults) {
      drawBoundingBoxes();
    }
  }, [detectionResults]);

  return (
    <div className="main-camera">
      <div className="camera-container">
        <video ref={videoRef} autoPlay className="camera-video"></video>
        <canvas
          ref={canvasRef}
          className="camera-canvas"
          style={{
            pointerEvents: "none", // Disable mouse interaction with the canvas
            width: "100%",
            height: "auto",
          }}
        ></canvas>
        <div className="controls">
          {!isCameraOn ? (
            <button onClick={startCamera} className="btn-start">
              Open Camera
            </button>
          ) : (
            <button onClick={stopCamera} className="btn-stop">
              Stop Camera
            </button>
          )}
        </div>
        {detectionResults && (
          <div className="results">
            <h3>Detection Results:</h3>
            {detectionResults.map((result, index) => (
              <div key={index} className="result-item">
                <p>
                  <strong>Label:</strong> {result.label}
                </p>
                <p>
                  <strong>Confidence:</strong> {result.label.split(": ")[1]}
                </p>
                <p>
                  <strong>Bounding Box:</strong> {result.box.join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraApp;
