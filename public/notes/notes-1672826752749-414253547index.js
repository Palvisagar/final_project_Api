const express = require('express')
const app = express()
const port = 5000
const config = require("./config/db")
const adminroutes = require("./routes/adminRoutes")

app.use(express.urlencoded({extended:true}))
app.use("/admin",adminroutes)

app.listen(port,function(){
    console.log("server running ar port 5000")
})