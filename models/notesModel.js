const mongo= require('mongoose')

const notesSchema={
    'categoryId' : { type: mongo.Schema.Types.ObjectId , ref:'category', default:''},
    // 'notes_category':{type:String,require},
    'notes_topic':{type:String,require},
    'notes_description':{type:String,require},
    'notes':{type:String,require},
    'isStatus':{type:Boolean,default:true},
    'created_at':{type:Date,default:Date.now()}
}

module.exports=mongo.model('notes',notesSchema)