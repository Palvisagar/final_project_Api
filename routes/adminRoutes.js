const router =require('express').Router()
var categorycontroller=require('../controllers/categoryController')
var usercontroller=require('../controllers/userController')
var notescontroller=require('../controllers/notesController')
var quizcontroller=require('../controllers/quizController')
var questioncontroller=require('../controllers/questionController')
var resultcontroller=require('../controllers/resultControl')
var viewuser=require('../controllers/viewuserController')

const multer  = require('multer')
const notestorage = multer.diskStorage({
destination: function (req, file, cb) {
    cb(null, './public/notes')
},
filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const new_name = uniqueSuffix+file.originalname
    cb(null, file.fieldname + '-' + new_name)
}
})
const notesupload = multer({ storage: notestorage })

//router.use(require('../common/adminmiddleware'))

router.post('/login',usercontroller.login)

// category api
router.post('/addcategory',categorycontroller.addcategory)
router.post('/listcategory',categorycontroller.listCategory)
router.post('/updatecategory',categorycontroller.updatecategory)
router.post('/deletecategory',categorycontroller.deletecategory)


// notes api
router.post('/addnotes',notesupload.single('notes'),notescontroller.addnotes)
router.post('/listnotes',notescontroller.listnotes)
router.post('/updatenotes',notescontroller.updatenotes)
router.post('/deletenotes',notescontroller.deletenotes)

//quiz api
router.post('/addquiz',quizcontroller.addquiz)
router.post('/listquiz',quizcontroller.listquiz)

//question api
router.post('/addquestion',questioncontroller.addquestion)
router.post('/listquestion',questioncontroller.listquestion)

//result api
router.post('/result',resultcontroller.result)
router.post('/viewresult',resultcontroller.viewresult)

//user api
router.post('/register',viewuser.register)
router.post('/listuser',viewuser.listuser)

router.all("**",function(req,res){
    res.json({
        'status':404,
        'sucess':false,
        'msg':'unknown routes'
    })
})
 module.exports = router
