var express = require('express')
var router = express.Router()
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")
const {getBroadBandPlans,getBroadBandPlansByLocation,addBroadBand,updateBroadbandPlan,removeplan} = require("../controllers/broadband");
const {getUserById} = require("../controllers/user")


router.param("userId",getUserById);


//routes
//get
router.get("/broadband",getBroadBandPlans);
router.post("/broadbandbylocation",getBroadBandPlansByLocation);


//Create
router.post("/addbroadband/:userId",isSignedIn,isAuthenticated,isAdmin,addBroadBand);

//update
router.post("/updateBroadbandPlan/:userId",isSignedIn,isAuthenticated,isAdmin,updateBroadbandPlan);

//delete
router.post("/deletebroadplan",isSignedIn,isAuthenticated,isAdmin,removeplan)

module.exports = router



