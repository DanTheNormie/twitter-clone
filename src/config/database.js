const mongoose = require('mongoose');
require('dotenv').config()

const db_url = process.env.PROD ? process.env.DB_URL_PROD : process.env.DB_URL;

function connect_db(){
    mongoose.connect(db_url,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{console.log(`connection made successfully at ${db_url}`);})
    .catch((err)=>{console.log(`connection to DB failed,\n Reason : ${err}`);})
}

connect_db()