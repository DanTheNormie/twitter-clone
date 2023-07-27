const { MongoGridFSChunkError } = require('mongodb')
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    likes:{
        count:Number,
        users:[{
            data:{
                type:mongoose.Schema.Types.ObjectId
            }
        }]
    },
    createdAt:{
        type:mongoose.Schema.Types.Date,
        required:true
    },
    by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    article:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Article',
        required:true
    }
})

module.exports = mongoose.model('Comment',commentSchema)