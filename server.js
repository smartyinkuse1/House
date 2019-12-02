const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')




app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200")
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS")

    next()
})



require('./backend/routes/route')(app)
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
}).then(()=>{
    console.log("connected to database")
}).catch(err =>{
    console.log("couldn't connect", err)
})
app.listen(4000, ()=>{
    console.log('Server running on port  4000')
})