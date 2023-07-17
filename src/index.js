/* Dependencies */
const express = require('express')
const app = express()
const passport = require('passport')
require('dotenv').config()
const session = require('express-session')

/* Environment Config */
const PORT = process.env.PORT || 3000

/* session config */

const sessionOptions = {
    
}

/* Passport Config */
app.use(passport.initialize())
require('./config/passport')(passport)

/* DB config */
require('./config/database')

/* json and form data parsing config */
app.use(express.json());
app.use(express.urlencoded({extended:true}));




app.use(require('./routes/traffic_signal'))




/* Process Hook */
app.listen(PORT,()=>{console.log(`server running at ${PORT}`);})