const mongo= require('mongoose')

const quizSchema={
    // 'categoryId' : { type: mongo.Schema.Types.ObjectId , ref:'category', default:''},
    'quiz_category':{type:String,require},
    'quiz_topic':{type:String,require},
    'is_Status':{type:Boolean,default:true},
    'created_at':{type:Date,default:Date.now()}
}

module.exports=mongo.model('quiz',quizSchema)
