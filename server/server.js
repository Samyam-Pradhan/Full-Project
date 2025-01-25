require('dotenv').config();
const express = require("express");
const app = express();
const router = require('./router/auth-router');
const connectDb = require("./utils/db");
const cors = require("cors");
const adminRoute = require("./router/admin-router");

// CORS handling
const corsOptions = {
    origin: "http://localhost:5173", // React app URL
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Apply CORS middleware before defining routes
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());

// Define routes
app.use("/api/auth", router);
app.use("/api/admin", adminRoute);

// Start the server
const PORT = 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });
});
