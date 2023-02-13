const mongo= require('mongoose')

const questionSchema=({
    'quizId':{type:mongo.Schema.Types.ObjectId,ref:'quiz',default:''},
    'question':{type:String,require},
    'option':[{
        'option1':{type:String,require},
        'option2':{type:String,require},
        'option3':{type:String,require},
        'option4':{type:String,require}
    }],
    'answer':{type:String,require},
    'isBlocked':{type:Boolean,default:false},
    'isStatus':{type:Boolean,default:true},
    'created_at':{type:Date,default:Date.now()}
})

module.exports=mongo.model('question',questionSchema)
