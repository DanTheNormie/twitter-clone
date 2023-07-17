const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const {compare, genSalt, hash} = require('bcrypt')
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    age:mongoose.Schema.Types.Number,
    followers:{
        count:mongoose.Schema.Types.Number,
        users:[
            {
                data:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"User"
                }
            }
        ]
    },
    following:{
        count:mongoose.Schema.Types.Number,
        users:[
            {
                data:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"User"
                }
            }
        ]
    },
    articles:[{
        data:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Article"
        }
    }]
})

userSchema.methods.comparePassword = async function(pass){
    return await compare(pass,this.password)
}

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    try{
        const salt = await genSalt();
        this.password = await hash(this.password, salt)
        next()
    }catch(err){
        next(err)
    }
})

module.exports = mongoose.model("User", userSchema)