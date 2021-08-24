const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")

const app = express();




mongoose.connect('mongodb://localhost:27017/csDB', {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
}).then(()=>console.log("DATABASE CONNECTED"));


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());





// Routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)

app.listen(5000,()=>{
    console.log("Server started")
})

const API = 'http:localhost:3000/api/'
