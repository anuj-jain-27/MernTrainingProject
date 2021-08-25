const express = require('express')
const router = express.Router()

const {getUserById,getUser,getAllUsers,userPurchaseList} = require("../controllers/user")
const {getCurrentBroadbandPlan,getBroadbandPaymentHistory} = require("../controllers/broadbandops")
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")

router.param("userId",getUserById)


router.get("/user/:userId",isSignedIn,isAuthenticated,getUser)

router.get("/users",getAllUsers);

//router.put("/user/:userId",)

router.get("/orders/user/:userId",isSignedIn,isAuthenticated,userPurchaseList)

router.get("/broadband/user/:userId",isSignedIn,isAuthenticated,getCurrentBroadbandPlan)

router.get("/broadbandpayhis/user/:userId",isSignedIn,isAuthenticated,getBroadbandPaymentHistory)

module.exports = router