const User = require("../models/user")
const jwt = require("jsonwebtoken")
const expressJwt = require('express-jwt')

const JWT_SECRET ="sshhhh"

exports.signup = (req,res)=>{
   
    const user = new User(req.body)
    user.save((err,user)=>{
        if(err){ return res.status(400).json({
            err : "User is not saved in database"
        }) 
    }
     //res.json(user);
      res.json({
          name : user.name,
          email: user.email,
          id : user._id
      })
    })
}

exports.signin = (req,res)=>{
    const {email,password} = req.body;

    User.findOne({email},(err,user)=>{
        if(err || !user){ 
           return res.status(400).json({
            error : "User email is not present in database"
            })
     }
     
     if(!user.authenticate(password)){
        return res.status(400).json({
             error : "Email and password do not match"
         })
     }
    
     // Create Token
     const token = jwt.sign({_id : user._id},JWT_SECRET)
     
     res.cookie("token",token,{expire : new Date() + 999}); 
        
     const {_id,name,email,role} =user;
     
     return res.json({token,user : {_id,name,email,role}})
    })
}


exports.signout = (req,res)=>{

   res.clearCookie("token")
    
    res.send("User signout successful")
    res.json({
        message : "Signout successful"
    });
    

}

// protected routes
exports.isSignedIn = expressJwt({
     secret: JWT_SECRET,
     algorithms: ['HS256'],
     userProperty : "auth" 
    // setting properties in user browser using cookies     
});

// custom middlewares
exports.isAuthenticated = (req,res,next)=>{
    let permission = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!permission){
      return res.status(403).json({
          error : "ACCESS DENIED"
      })
    }
    next();
}
// 0-> user , 1->admin
exports.isAdmin = (req,res,next)=>{
    if(req.profile.role === 0) return res.status(403).json({
        error : "Not Admin, ACCESS DENIED"
    })
    next();
}
