var express = require('express')
var router = express.Router()
const {signout,signup,signin,isSignedIn} = require("../controllers/auth")

router.get("/signout",signout)

router.get("/testroute",isSignedIn,(req,res)=>{

   // res.send("A protected route")
   res.json(req.auth)
})

router.post("/signup",signup)

router.post("/signin",signin)



module.exports = router;