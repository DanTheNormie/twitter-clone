const mongoose = require('mongoose')


const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:mongoose.Schema.Types.Date,
        required:true
    },
    likes:{
        count:Number,
        users:[{user:{type:mongoose.Schema.Types.ObjectId,ref:'User'}}]
    }
})

module.exports = mongoose.model("Article", articleSchema)