const User = require("../models/user")
const Broadband = require("../models/broadband");
const BroadbandLocation = require("../models/broadbandLocation")


//get
exports.getBroadBandPlans = (req,res)=>{
    Broadband.find({}).exec((err,plans)=>{
        if(err || !plans){
            return res.status(400).json({
                error : "No Broadband Plan available"
            })
        }
        res.json(plans)
    })
}

//getByLocation
exports.getBroadBandPlansByLocation = (req,res)=>{
    
    BroadbandLocation.find({_id : req.body._id}).exec((err,plans)=>{
        if(err || !plans){
            return res.status(400).json({
                error : "No Broadband Plan available"
            })
        }
        // console.log(plans);
        Broadband.find({_id: { $in:plans[0].availableplans}}).exec((err,plans)=>{
            if(err || !plans){
                return res.status(400).json({
                    error : "Sorry currently we don't have any plans for your area"
                })
            }
            res.json(plans);
        })
    })
}

//Create
exports.addBroadBand = (req,res)=>{
    var plan = new Broadband(req.body);
    plan.save((err,result)=>{
        if(err){
            return res.status(400).json({
                error : "Could Not Add Plan"
            })
        }
        res.json(result);
    })
}

//update
exports.updateBroadbandPlan = (req,res)=>{
    Broadband.findOneAndUpdate(
        {_id : req.body._id},
        {$set : req.body},
        {new: true},
        (err,plan) =>{
            if(err){
                return res.status(400).json({
                    error : "Error while updating plans"
                })
            }
            res.json(plan);
        }
    )
}


//delete
exports.removeplan = (req, res)=>{
    var id = req.body._id;
    Broadband.findByIdAndRemove(
        id,
        (err,plan)=>{
            if(err){
                return res.status(400).json({
                    error :"Error while deleting the broadband plan"
                })
            }
            res.json({
                message : 'Selected Plan ${plan.name} deleted successfully' 
            })
        }
    )
    //FutureScope delete from BroadbandLocation
}
