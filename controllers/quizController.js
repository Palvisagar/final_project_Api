const Quiz=require('../models/quizModel')
function addquiz(req,res){
    if(req.body != null && req.body != undefined)
    {
        let quizObj = new Quiz()
        quizObj.quiz_category = req.body.quiz_category
        quizObj.quiz_topic = req.body.quiz_topic

        quizObj.save()

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
            'message':'Please fill form'
        })
    }
}

function listquiz(req,res){
    Quiz.find(req.body).exec()
    .then(quizobj=>{

        if(quizobj != null )
        {
            res.json({
                'status':200,
                'success':true,
                'message':'data loaded',
                'data':quizobj
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
    addquiz,
    listquiz
}