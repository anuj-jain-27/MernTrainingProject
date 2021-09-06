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
const postRoutes = require('./routes/posts');
const dataRoutes = require("./routes/dataconsumption")
const planRoutes =require('./routes/plans');
const paymentcards=require("./routes/paymentcards")
const searchroutes=require("./routes/search")

const app = express();



/*mongoose.connect('mongodb+srv://AnushaMadan:Madan1204@cluster0.k0byf.mongodb.net/TrainingProject?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=>console.log("DATABASE CONNECTED"));*/

//const CONNECTION_URL='mongodb+srv://AnushaMadan:Madan1204@cluster0.k0byf.mongodb.net/TrainingProject?retryWrites=true&w=majority'
// const PORT=process.env.PORT || 8000;
// mongoose.connect(CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology:true})
//     .then(()=>app.listen(PORT,()=>{
//         console.log(`Server running on port: ${PORT}`)
        
// }))
//     .catch((error)=>console.log(error.message));
// mongoose.set('useFindAndModify',false);

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
app.use('/api', postRoutes);
app.use('/api', dataRoutes);
app.use('/api', planRoutes);
app.use('/api',paymentcards)
app.use('/api',searchroutes)

/*app.listen(8000,()=>{
    console.log("Server started")
})*/
module.exports = app
