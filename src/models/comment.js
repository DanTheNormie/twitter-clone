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
    }
})

module.exports = mongoose.model('Comment',commentSchema)