const Quiz = require('../models/quizModel')
const Question=require('../models/questionModel')


function addquestion(req,res){
    validators = ''
    if(req.body.question == undefined || req.body.question == null)
    {
        validators+="question is required \n"
    }
    // if(req.body.option == undefined)
    // {
    //     validators+="option is required \n"
    // }
    
    if(req.body.answer == undefined || req.body.answer == null)
    {
        validators+="answer is required \n"
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
        let quizObj = new Quiz()
        quizObj.quiz_category = req.body.quiz_category
        quizObj.quiz_topic = req.body.quiz_topic
        quizObj.save()
        .then(async quizdata=>{
            var questioncount = await Question.countDocuments().exec()
            let questionObj = new Question()
            questionObj.sno = questioncount+1
            questionObj.question = req.body.question
            questionObj.option.push({
                'option1':req.body.option1,
                'option2':req.body.option2,
                'option3':req.body.option3,
                'option4':req.body.option4
            })
            questionObj.answer = req.body.answer
            questionObj.quizId = quizdata._id

            questionObj.save()
            res.json({
                'status':200,
                'success':true,
                'message':'Question Registed'
            })
        })
        .catch(err=>{
            res.json({
                'status':500,
                'success':false,
                'message':'Error while inserting question',
                'error':String(err)
            })
        })
    }    
}

function listquestion(req,res){
    Question.find(req.body).exec()
     .then(questionobj=>{
 
         if(questionobj != null )
         {
             res.json({
                 'status':200,
                 'success':true,
                 'message':'data loaded',
                 'data':questionobj
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


module.exports = {
    addquestion,
    listquestion
}