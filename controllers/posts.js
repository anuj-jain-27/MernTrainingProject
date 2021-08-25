
const PostMessage = require( '../models/postMessage');

exports.getPostMessageById = (req,res,next,id)=>{
    PostMessage.findById(id).exec((err,post)=>{
           if(err ||  !post){
               return res.status(400).json({
                   error : "Plan not present in database"
               })
           }
           req.category = post;
           next();
        })    
}

exports.getPostMessage = (req,res) => {
    return res.json(req.postMessage)
 }
 
 exports.getAllPosts = (req,res) => {
     PostMessage.find({}).exec((err,posts)=>{
         if(err){
             return res.status(400).json({
                 error : "Unable to find plans in database"
             })
         }
          res.json(posts)
     })   
 }
 
exports.createPost = (req,res) => {
    const postmessage = new PostMessage(req.body)
    
    postmessage.save((err,postmessage)=>{
        if(err){
            return res.status(400).json({
                error : "Unable to save plan to database"
            })
        }
        res.json({
            postmessage});
    })

}

exports.updatePost = (req,res) => {
    // req.category is getting populated from the middleware
    const post = req.post;
    post.plan = req.body.plan;
    post.validity = req.body.validity;
    post.data = req.body.data;
    post.sms = req.body.sms;
    post.cost = req.body.cost;
   post.save((err,updatedPost)=>{
        if(err){
            return res.status(400).json({
                error : "Failed to update plan in database"
            })
        }
        res.json(updatedPost)
    })
}

exports.deletePost = (req,res) => {
    const post = req.post;

    post.remove((err,deletedPost)=>{
        if(err){
            return res.status(400).json({
                error : "Unable to delete plan in database"
            })
        }
        else if(!deletedPost){
            return res.status(404).json({
                error : "No such plan exists in database"
            })
        }
        res.json({
            message : `Successfully deleted ${deletedPost.plan}`
        })
    })
}
