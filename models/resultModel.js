const mongo= require('mongoose')

const resultSchema={
    'user_name':{type:String,require},
    'quiz_name':{type:String,require},
    'quiz_type':{type:String,require},
    'quiz_question':{type:String,require},
    'quiz_result':{type:String,require},
    'quiz_total':{type:String,require},
    'isStatus':{type:Boolean,default:true},
    'created_at':{type:Date,default:Date.now()}
}

module.exports=mongo.model('result',resultSchema)