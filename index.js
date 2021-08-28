const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport')

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")
const broadbandRoutes = require("./routes/broadband");
const broadbandLocRoutes = require("./routes/broadbandLocation");
const broadbandOpsRoutes = require("./routes/broadbandops")

const app = express();



mongoose.connect('mongodb://localhost:27017/csTestDB', {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=>console.log("DATABASE CONNECTED"));


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());




// Routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",orderRoutes)
app.use("/api",broadbandRoutes)
app.use("/api",broadbandLocRoutes)
app.use("/api",broadbandOpsRoutes)



app.listen(8000,()=>{
    console.log("Server started")
})

const API = 'http:localhost:3000/api/'
