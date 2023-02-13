const mongo =require('mongoose')

const categorySchema=mongo.Schema({
    'category_name':{type:String,require},
    'isBlocked':{type:Boolean,default:false},
    'isStatus':{type:Boolean,default:true},
    'created_at':{type:Date,default:Date.now()}
})

module.exports=mongo.model('category',categorySchema)