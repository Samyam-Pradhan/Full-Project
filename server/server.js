
const express = require("express");
const app = express();
const connectDb = require("./utils/db");
const cors = require("cors");

// Import Routes
const authRoute = require('./router/auth-router');
const adminRoute = require("./router/admin-router");
const userRoute = require("./router/user-router"); // ✅ Import user route

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
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api", userRoute); //  Add user route

// Start the server
const PORT = process.env.PORT || 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });
});
