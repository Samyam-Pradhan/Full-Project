import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "../assets/Camera.css";

const CameraApp = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [detectionResults, setDetectionResults] = useState(null);

  const maskAudio = useRef(new Audio("mask alert.mp3")); // Reference to the audio file

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

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    setDetectionResults(null);
    setIsCameraOn(false);
  };

  // Capture and detect mask
  const captureAndDetectMask = async () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const imageUrl = canvas.toDataURL("image/jpeg");

      try {
        const response = await axios.post("http://localhost:8000/detect-mask/", {
          image: imageUrl,
        });

        setDetectionResults(response.data.results);
      } catch (error) {
        console.error("Error sending frame to backend:", error);
      }
    }
  };

  // Periodically capture and send frames
  useEffect(() => {
    const interval = setInterval(() => {
      if (isCameraOn) {
        captureAndDetectMask();
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isCameraOn]);

  // Draw bounding boxes and play audio alert for "No Mask"
  const drawBoundingBoxes = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!videoRef.current) return;

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    if (detectionResults) {
      detectionResults.forEach((result) => {
        const [startX, startY, endX, endY] = result.box;

        let scaledStartX = startX;
        let scaledStartY = startY;
        let scaledWidth = endX - startX;
        let scaledHeight = endY - startY;

        if (scaledStartX <= 1 && scaledStartY <= 1 && endX <= 1 && endY <= 1) {
          scaledStartX *= canvas.width;
          scaledStartY *= canvas.height;
          scaledWidth *= canvas.width;
          scaledHeight *= canvas.height;
        }

        const isWearingMask =
          result.label.toLowerCase().includes("mask") &&
          !result.label.toLowerCase().includes("no mask");
        const strokeColor = isWearingMask ? "green" : "red";
        const textColor = strokeColor;

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 3;
        ctx.strokeRect(scaledStartX + 115, scaledStartY - 50, scaledWidth, scaledHeight - 10);

        ctx.fillStyle = textColor;
        ctx.font = "16px Arial";
        ctx.fillText(
          `${result.label}`,
          scaledStartX,
          scaledStartY > 10 ? scaledStartY - 10 : scaledStartY + 20
        );

        // Play audio alert if no mask detected
        if (!isWearingMask) {
          maskAudio.current.play(); // Play the audio alert
        }
      });
    }
  };

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
            pointerEvents: "none",
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