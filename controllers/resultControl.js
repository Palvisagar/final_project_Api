const Result = require('../models/resultModel')

function result(req,res){
    // console.log(req.body)
    if(req.body != null && req.body.user_name != undefined)
    {
        let resultObj = new Result()
        resultObj.user_name = req.body.user_name
        resultObj.quiz_result = req.body.quiz_result
        resultObj.marks = req.body.marks
        resultObj.total = req.body.total
        resultObj.save()

        res.json({
            'status':200,
            'success':true,
            'message':'result inserted'
        })
    }
    else{
        res.json({
            'status':500,
            'success':false,
            'message':'Please fill field'
        })
    }
}
function viewresult(req,res){
    Result.find(req.body).exec()
    .then(resultobj=>{

        if(resultobj != null )
        {
            res.json({
                'status':200,
                'success':true,
                'message':'data loaded',
                'data':resultobj
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
module.exports={
    result,
    viewresult
}