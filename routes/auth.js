var express = require('express')
const passport = require('passport')
var router = express.Router()
const {signout,signup,signin,isSignedIn} = require("../controllers/auth")

router.get("/signout",signout)

router.get("/testroute",isSignedIn,(req,res)=>{

   // res.send("A protected route")
   res.json(req.auth)
})


router.get("/auth/google",
  passport.authenticate('google', { scope: ["profile","email"] })
  // ,function(req,res) {
  //    const token = jwt.sign({_id : user._id},JWT_SECRET)
     
  //    res.cookie("token",token,{expire : new Date() + 999}); 
        
  //    const {_id,name,email,role} =user;
               
  //    return res.json({token,user : {_id,name,email,role}})
      
  // }
);


router.get("/auth/google/profile",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    
    //res.send("User redirected to profile page")
    res.redirect("http://localhost:8000/api/profile");
    //res.redirect("api/signin")
  });


///////////////////////////////////////////////////////////////////////
//router.get("/signup",signup)

//router.post("/signin",signin)

//router.get("/signin",signin)

// For google auth
router.get("/profile",signin)


// router.post("/signup",signup)

// router.post("/signin",signin)



module.exports = router;