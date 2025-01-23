import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "../assets/Camera.css";

const CameraApp = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [detectionResults, setDetectionResults] = useState([]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Unable to access the camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    setIsCameraOn(false);
    setDetectionResults([]);
  };

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

        setDetectionResults(response.data.results || []);
      } catch (error) {
        console.error("Error during detection:", error);
      }
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const response = await axios.post("http://localhost:8000/detect-mask/", {
            image: reader.result,
          });

          setDetectionResults(response.data.results || []);
        } catch (error) {
          console.error("Error during detection:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const drawBoundingBoxes = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!videoRef.current || !detectionResults.length) return;

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    detectionResults.forEach(({ label, box }) => {
      const [startX, startY, endX, endY] = box;
      const isMask = label.toLowerCase().includes("mask") && !label.toLowerCase().includes("no mask");
      const color = isMask ? "green" : "red";

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(startX, startY, endX - startX, endY - startY);

      ctx.fillStyle = color;
      ctx.font = "16px Arial";
      ctx.fillText(label, startX, startY > 20 ? startY - 10 : startY + 20);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isCameraOn) captureAndDetectMask();
    }, 1000); // Capture every second
    return () => clearInterval(interval);
  }, [isCameraOn]);

  useEffect(() => {
    drawBoundingBoxes();
  }, [detectionResults]);

  return (
    <div className="camera-container">
      <div className="camera-main">
        <div className="video-container">
          <video ref={videoRef} autoPlay muted className="video" />
          <canvas ref={canvasRef} className="canvas" />
        </div>

        <div className="buttons-container">
          <button
            onClick={isCameraOn ? stopCamera : startCamera}
            className={`button ${isCameraOn ? "button-red" : "button-green"}`}
          >
            {isCameraOn ? "Stop Camera" : "Start Camera"}
          </button>
          <label className="button button-blue">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {detectionResults.length > 0 && (
          <div className="detection-results">
            <h3>Detection Results:</h3>
            {detectionResults.map(({ label, box }, index) => (
              <div key={index} className="mb-2">
                <p>
                  <strong>Label:</strong> {label}
                </p>
                <p>
                  <strong>Bounding Box:</strong> {box.join(", ")}
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
