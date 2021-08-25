const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const postSchema = new mongoose.Schema({

    plan:{
        type : Number,
        trim : true,
        required : true,
        
    },
    validity: {
        type : String,
        trim : true,
        required : true,
        maxlength : 2000
    },
    data : {
        type : Number,
        trim : true,
        required : true,
        maxlength : 32
    },
    SMS: {
        type : ObjectId,
        ref : "Category",
        required : true
    },
    cost :{
        type : Number,
        default : 0
    },
    selectedFile:{
       type : Number,
       default : 0
    },
   
},{timestamps : true})


module.exports = mongoose.model("PostMessage",postSchema);