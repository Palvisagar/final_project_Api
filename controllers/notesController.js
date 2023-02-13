const Category = require('../models/categoryModel')
const Notes=require('../models/notesModel')


function addnotes(req,res){
    validators = ''
    if(req.body.notes_category == undefined)
    {
        validators+="notes_category is required \n"
    }
    if(req.body.notes_topic == undefined)
    {
        validators+="notes_topic is required \n"
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
        Category.findOne({'_id':req.body.id}).exec()
            .then( notesdata=>{
                Notes.find(req.body).exec()
                let notesObj = new Notes()
                notesObj.sno = notescount+1
                notesObj.notes_topic = req.body.notes_topic 
                notesObj.notes_description = req.body.notes_description
                if(req.file)
                {
                    notesObj.notes = req.file.filename
                }                  
                notesObj.categoryId = notesdata._id
                notesObj.save()
                res.json({
                    'status':200,
                    'success':true,
                    'message':'notes inserted'
                })
            })
            .catch(err=>{
                res.json({
                    'status':500,
                    'success':false,
                    'message':'Error while inserting user',
                    'error':String(err)
                })
            })
        }
}

function listnotes(req,res){
   Notes.find(req.body).populate('categoryId').exec()
    .then(notesdata=>{

        if(notesdata != null )
        {
            res.json({
                'status':200,
                'success':true,
                'message':'data loaded',
                'data':notesdata
            })    
        }
        else{
            res.json({
                'status':200,
                'success':true,
                'message':'data loaded',
                'data':[]
            })
        }

    })
    .catch(err=>{
        res.json({
            'status':500,
            'success':false,
            'message':'Server Error',
            'data':err
        })    
    })
}

function updatenotes(req,res){

    if(req.body._id == undefined)
    {
        res.json({
            'status':422,
            'success':false,
            'message':"_id is required"
        })
    }
    else{
        Notes.findOne({'_id':req.body._id}).exec()
        .then(updatenotes=>{
    
            if(updatenotes == null)
            {
                res.json({
                    'status':200,
                    'success':true,
                    'message':'Notes not exists'
                })
            }else{
    
                updatenotes.notes_category = req.body.notes_category
                updatenotes.save()
    
                res.json({
                    'status':200,
                    'success':true,
                    'message':'Notes updated'
                })
    
            }
    
        })
        .catch(err=>{
            res.json({
                'status':500,
                'success':false,
                'message':String(err)
            })
        })
    }
}


function deletenotes(req,res){
    if(req.body._id == undefined)
    {
        res.json({
            'status':422,
            'success':false,
            'message':"_id is required"
        })
    }
    else{
        Notes.findOne({'_id':req.body._id}).exec()
        .then(data=>{
    
            if(data == null)
            {
                res.json({
                    'status':200,
                    'success':true,
                    'message':'Notes not exists'
                })
            }else{
    
               Notes.deleteOne({'_id':req.body._id}).exec()
               .then(deldata =>{
                    console.log(deldata)
                    res.json({
                        'status':200,
                        'success':true,
                        'message':'notes deleted'
                    })

               }).catch(error=>{
                res.json({
                    'status':500,
                    'success':false,
                    'message':"Error while delete "+String(error)
                })
               })
    
            }
    
        })
        .catch(err=>{
            res.json({
                'status':500,
                'success':false,
                'message':String(err)
            })
        })
    }
}
module.exports = {
    addnotes,
    listnotes,
    updatenotes,
    deletenotes
}