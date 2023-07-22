const User = require('../models/user')
const utils = require('../lib/utils')

exports.login = async(req,res)=>{
    const {email, password} = req.body
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(200).json({
                statusCode:200,
                success:false,
                data:null,
                msg:"No Such User"
                
            });
        }
        const isValid = await user.comparePassword(password)

        if(isValid){
            const tokenObj = utils.issueJWT(user._id)
            res.status(200).json({
                statusCode:200,
                success:true,
                data:{
                    user:user, 
                    token: tokenObj.token, 
                    expires: tokenObj.expires
                },
                msg:'User Logged In Successfully'
                
            })
        }else{
            res.status(200).json({
                statusCode:200,
                success:false,
                data:null,
                msg:"Email (or) Password Incorrect" 
                
            })
        }

    }catch(err){
        console.log(err);
        res.status(500).json({
            statusCode:500,
            success:false,
            data:null,
            err:err.message,
            msg:"User Login Failed Successfully"
            
        })
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
        res.status(200).json({
            statusCode:200,
            success:true, 
            data:{
                user:savedUser, 
                token: jwt.token, 
                expiresIn: jwt.expires
            },
            msg:"User Registered successfully"
        })
    }catch(err){
        console.log(err);
        res.status(200).json({
            statusCode:200,
            success:false, 
            data:null,
            err:err,
            msg:"User Already Exists"   
        })
    }
}