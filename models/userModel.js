 const mongo = require("mongoose")
 const adminSchema = mongo.Schema({
     'email' : { type: String, default:''},
     'password' : { type: String, default:''},
     'is_blocked' : { type: Boolean, default:false},
     'created_at' : { type: Date, default:Date.now()},

})

 module.exports = mongo.model('admin',adminSchema)