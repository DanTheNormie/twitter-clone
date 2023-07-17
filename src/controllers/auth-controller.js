const User = require('../models/user')
const utils = require('../lib/utils')

exports.login = async(req,res)=>{
    const {email, password} = req.body
    try{
        const user = await User.findOne({email})
        if(!user){
            res.status(401).json({success: false, msg: 'could not find user'});
        }
        const isValid = await user.comparePassword(password)

        if(isValid){
            const tokenObj = utils.issueJWT(user._id)
            res.status(200).json({success:true, user:user, token: tokenObj.token, expires: tokenObj.expires})
        }else{
            res.status(401).json({success:false, msg: "you entered the wrong password"})
        }

    }catch(err){
        console.log(err);
    }
}

exports.register = async(req,res)=>{
    const {email, username, password} = req.body
    console.log(req.body);
    const newUser = new User({
        email:email, 
        username:username, 
        password:password
    })
    try{
        const savedUser = await newUser.save()
        const jwt = utils.issueJWT(savedUser.id)
        res.json({success:true, user:savedUser, token: jwt.token, expiresIn: jwt.expires})
    }catch(err){
        console.log(err);
    }
}