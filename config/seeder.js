 const User = require('../models/userModel')
 const bcrypt = require('bcrypt');
 const saltRounds = 10;

 exports.insertuser = ()=>{

     User.findOne({'email':'admin@gmail.com'}).exec()
     .then(user=>{
        if(user == null)
        {
             let userObj = new User()
             userObj.name = 'Admin'
             userObj.email = 'admin@gmail.com'
             userObj.password = bcrypt.hashSync('admin',saltRounds)
             userObj.save()
            console.log("Admin register")

        }else{
            console.log("Admin already register")
        }
     })
     .catch(err=>{
         console.log("Error while adding admin")
     })
 }