const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
    cat:mongoose.Schema.Types.Date,
    url:String,
    method:String,
    ip:String,
})

module.exports = mongoose.model('Log', logSchema)