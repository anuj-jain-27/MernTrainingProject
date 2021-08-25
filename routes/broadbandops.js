var express = require('express')
var router = express.Router()
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")
const {buynewbroadband,broadbandplandpayment,BroadbandRenewalUpgradeRequest,BroadbandPlanRenewalUpgrade} = require("../controllers/broadbandops")
const {getUserById} = require("../controllers/user")


router.param("userId",getUserById);

//Routes
router.post("/buynewbroadband/:userId",isSignedIn,isAuthenticated,buynewbroadband)

router.post("/buypaymentresponce/:userId",isSignedIn,isAuthenticated,broadbandplandpayment)

router.post("/renewupgradebroadband/:userId",isSignedIn,isAuthenticated,BroadbandRenewalUpgradeRequest)

router.post("/renewpaymentresponse/:userId",isSignedIn,isAuthenticated,BroadbandPlanRenewalUpgrade)


module.exports = router
