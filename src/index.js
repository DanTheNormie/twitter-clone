/* Dependencies */
const express = require('express')
const app = express()
const passport = require('passport')
require('dotenv').config()
const session = require('express-session')
const ejsMate = require('ejs-mate')
const path = require('path')
const cors = require('cors')
const fs = require('fs')
const Log = require('./models/log')



app.use(async (req,res,next)=>{

    const newLog = new Log({
        cat:new Date(),
        method:req.method,
        url:req.path,
        ip:req.ip  
    })
    newLog.save().then(()=>{console.log("log saved successfully");})
    next()
})

/* Environment Config */
const PORT = process.env.PORT || 3000

/* view/render engine config */
app.set('view engine','ejs')
app.engine('ejs',ejsMate)
app.set('views', path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))

/* CORS config */
app.use(cors())

/* Session Config */
const sessionOptions = {
    secret: process.env.SessionSecret || 'Today is a good day',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}



//app.use(session(sessionOptions))

/* Passport Config */
app.use(passport.initialize())
//app.use(passport.session(session))
require('./config/passport')(passport)

/* DB config */
require('./config/database')

/* json and form data parsing config */
app.use(express.json());
app.use(express.urlencoded({extended:true}));




app.use(require('./routes/traffic_signal'))




/* Process Hook */
app.listen(PORT,()=>{console.log(`server running at ${PORT}`);})