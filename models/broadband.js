const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const broadbandSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true,
        maxlength : 32
    },
    monthlyprice :{
        type : Number,
        trim : true,
        required : true,
        maxlength : 32
    },
    plantype :{
        type : String,
        trim : true,
        required : true,
        maxlength : 32
    },
    validity :{
        type : Number,
        trim : true,
        required : true,
        maxlength : 32
    },
    data :{   ///-1 for unlimited or GB of data
        type : Number,
        trim : true,
        required : true,
        maxlength : 32
    },
    uploadspeed :{
        type : Number,
        trim : true,
        required : true,
        maxlength : 32
    },
    downloadspeed :{
        type : Number,
        trim : true,
        required : true,
        maxlength : 32
    },
    speed :{
        type : Number,
        trim : true,
        required : true,
        maxlength : 32
    },
    availability :[{
        type : ObjectId,
        ref : "BroadbandLocation"
    }],
    planperks :[{
        type : ObjectId,
        ref : "Planperk"
    }]
},{timestamps :true})


module.exports = mongoose.model("Broadband",broadbandSchema);