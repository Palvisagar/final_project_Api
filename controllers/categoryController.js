const Category=require('../models/categoryModel')
function addcategory(req,res){
    // console.log(req.body)
    if(req.body != null && req.body.category_name != undefined)
    {
        let categoryObj = new Category()
        categoryObj.category_name = req.body.category_name
        categoryObj.save()

        res.json({
            'status':200,
            'success':true,
            'message':'Record Inserted'
        })
    }
    else{
        res.json({
            'status':500,
            'success':false,
            'message':'Please fill category name'
        })
    }
}

function listCategory(req,res){
    Category.find(req.body).exec()
    .then(categoryobj=>{

        if(categoryobj != null )
        {
            res.json({
                'status':200,
                'success':true,
                'message':'data loaded',
                'data':categoryobj
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


function updatecategory(req,res){

    if(req.body._id == undefined)
    {
        res.json({
            'status':422,
            'success':false,
            'message':"_id is required"
        })
    }
    else{
        Category.findOne({'_id':req.body._id}).exec()
        .then(updatecategory=>{
    
            if(updatecategory == null)
            {
                res.json({
                    'status':200,
                    'success':true,
                    'message':'Category not exists'
                })
            }else{
    
                updatecategory.category_name = req.body.category_name
                updatecategory.save()
    
                res.json({
                    'status':200,
                    'success':true,
                    'message':'Category updated'
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

function deletecategory(req,res){
    if(req.body._id == undefined)
    {
        res.json({
            'status':422,
            'success':false,
            'message':"_id is required"
        })
    }
    else{
        Category.findOne({'_id':req.body._id}).exec()
        .then(data=>{
    
            if(data == null)
            {
                res.json({
                    'status':200,
                    'success':true,
                    'message':'Category not exists'
                })
            }else{
    
               Category.deleteOne({'_id':req.body._id}).exec()
               .then(deldata =>{
                    console.log(deldata)
                    res.json({
                        'status':200,
                        'success':true,
                        'message':'Category deleted'
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
    addcategory,
    listCategory,
    updatecategory,
    deletecategory
}