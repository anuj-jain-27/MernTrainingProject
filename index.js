import express from 'express';
import mongoose from 'mongoose';

import cors from 'cors';//Cross-Origin Resource Sharing, https://stackabuse.com/handling-cors-with-node-js
//used to secure a certain web server from access by other website or domain. For example, only the allowed domains will be able to access hosted files in a server such as a stylesheet, image, or a script

//import productRoutes from './routes/posts.js'
//import searchRoutes from './routes/search.js'
//import userRoutes from './routes/user.js'

const app=express();

app.use(cors());


const CONNECTION_URL='mongodb+srv://anuj:Odyssey27101998@digitalcommerce.h7hbt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT=process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=>{
        console.log(`Server running on port: ${PORT}`)
})).catch((error)=>console.log(error.message));

