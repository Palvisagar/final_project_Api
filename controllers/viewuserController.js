const User=require('../models/viewuserModel')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const secketkey="Palvi@123"

function register(req,res){
    validators = ''
    if(req.body.name == undefined)
    {
        validators+="Name is required \n"
    }
    if(req.body.email == undefined)
    {
        validators+="email is required \n"
    }
    if(req.body.password == undefined)
    {
        validators+="password is required \n"
    }
    if(req.body.address == undefined)
    {
        validators+="address is required \n"
    }
    if(req.body.contact == undefined)
    {
        validators+="contact is required \n"
    }
    
    if(!!validators)
    {
        res.json({
            'status':422,
            'success':false,
            'message':validators
        })
    }
    else{
        User.findOne({'email':req.body.email}).exec()
        .then(user=>{
            if(user !=null)
            {
                 res.json({
                     'status':200,
                     'success':false,
                     'message':'User already registed'
                 })
            }
            else{
                let userObj = new User()
                userObj.name = req.body.name
                userObj.email = req.body.email
                userObj.password = bcrypt.hashSync(req.body.password,saltRounds)
                userObj.save()
                
                    res.json({
                        'status':200,
                        'success':true,
                        'message':'User Registed'
                    })
               
            }
        })
        .catch(err=>{
            res.json({
                'status':500,
                'success':false,
                'message':'Error while checking user existance',
                'error':String(err)
            })
        })        
    }
}

function listuser(req,res){
    
    Customer.find(req.body).populate('userId').exec()
    .then(userdata=>{
        res.json({
            'status':200,
            'success':true,
            'message':'User Loaded',
            'data':userdata
        })
    })
    .catch(err=>{
        res.json({
            'status':500,
            'success':false,
            'message':String(err)
        })
    })
}

module.exports={
    register,
    listuser
}

