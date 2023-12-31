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
        required:true,
       
    },
    likes:{
        type:Number,
        default:0
    },
    likedBy:{
        type : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    },
    comments:{
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }]
    }
})

module.exports = mongoose.model("Article", articleSchema)