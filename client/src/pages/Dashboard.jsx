import React from "react";
import CameraApp from "../components/Camera.jsx";
import Sidebar from "../components/Sidebar.jsx";

//adding the dashboard
function Dashboard() {
  return (
    <>
    <Sidebar />
    <CameraApp />
    </>
  )
}

export default Dashboard;
