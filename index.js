const express = require('express')
const app = express()
const port=2000
var cors = require('cors')
app.use(express.json({limit:'50mb'}))
app.use(cors())

const db = require('./config/db')
// const seeder=require('./config/seeder')
const adminRoute= require('./routes/adminRoutes')


app.use(express.urlencoded({extended:true}))

app.use('/admin',adminRoute)
// seeder.insertuser()


app.listen(port,()=>{
    console.log("server is running at",port)
})
