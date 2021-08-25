var express = require('express')
var router = express.Router()
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")
const {getBroadbandLocations,addBroadBandLocation,addBroadBandPlanToLocation,updateBroadbandLocation,removelocation} = require("../controllers/broadbandLocation")
const {getUserById} = require("../controllers/user")


router.param("userId",getUserById);


//get
router.get("/broadbandlocation",getBroadbandLocations)

//Create
router.post("/addBroadBandLocation/:userId",isSignedIn,isAuthenticated,isAdmin,addBroadBandLocation);

//ops
router.post("/addplantolocation/:userId",isSignedIn,isAuthenticated,isAdmin,addBroadBandPlanToLocation);

//update
router.post("/updatebroadlocation/:userId",isSignedIn,isAuthenticated,isAdmin,updateBroadbandLocation);

//delete
router.delete("/deletebroadlocation/:userId",isSignedIn,isAuthenticated,isAdmin,removelocation);


module.exports = router