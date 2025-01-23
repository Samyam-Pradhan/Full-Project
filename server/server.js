require('dotenv').config();
const express = require("express");
const app = express();
const router = require('./router/auth-router');
const connectDb = require("./utils/db");
const cors = require("cors");

//cors handling
const corsOptions ={
    origin: "http://localhost:5173",
    methods : "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", router);

const PORT = 5000;

connectDb().then(()=> {
app.listen(PORT, ()=>{
    console.log(`server running at port ${PORT}`);
    
})
});