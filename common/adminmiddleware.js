 const jwt = require("jsonwebtoken")
 const secketkey = "Palvi@123"

 module.exports = (req,res,next)=>{

     const token = req.headers['authorization'];
     if(token)
     {
         jwt.verify(token,secketkey,function(err,decoded){
             if(err){
                 res.json({
                     'status':403,
                     'success':false,
                     'message':'Unauthorised user'
                 })
             }
             req.decoded = decoded
             next()
         })
     }
     else{
         res.json({
             'status':403,
             'success':false,
             'message':'Unauthorised user'
         })
     }
}