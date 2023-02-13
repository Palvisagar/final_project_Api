const mongo = require("mongoose")
const userSchema = mongo.Schema({
    'user_name':{type:String,require},
    'email' : { type: String, default:''},
    'password' : { type: String, default:''},
    'contact':{type:Number,require},
    'address':{type:String,require},
    'gender':{type:String,require},
    'dob':{type:String,require},
    'is_blocked' : { type: Boolean, default:false},
    'created_at' : { type: Date, default:Date.now()},
})

module.exports = mongo.model('user',userSchema)