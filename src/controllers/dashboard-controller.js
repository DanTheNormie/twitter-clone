const Article = require('../models/article')
const User = require('../models/user')

async function getAllTweets(req,res){
    try{
        const articles = await Article.find().populate('author').sort({createdAt: 'desc'})
    
        res.status(200).json({
            success:true,
            statusCode:200,
            data:{articlesList:articles},
            msg:'Request Successful.'
        })

    }catch(err){
        res.json({
            success:false,
            statusCode:500,
            data:null,
            err:err,
            msg:'Request Failed, Please try again later.'
        })
    }
}

async function createTweet(req,res){
    try{
        const {title,desc,_id} = req.body;

        console.log(req.body);
        
        const newArticle = Article({
            title,
            desc,
            author:_id,
            createdAt:Date.now(),
            likes:{
                count:0,
                users:[]
            }
        })
        
        const article = await newArticle.save()
        const user = await User.findByIdAndUpdate(_id,{$push:{articles:article._id}})
        console.log(user);
        res.json({
            success:true,
            statusCode:200,
            data:{article},
            msg:'Article Created successfully'
        })

    }catch(err){
        console.log(err);

        res.json({
            success:false,
            statusCode:500,
            data:null,
            err:err,
            msg:'Request Failed, Please try again later.'
        })

    }
}

async function getUserDetails(req,res){
    try{
        console.log(req.params.user_id);
        const user = await User.findOne({_id:req.params['user_id']})
        if(!user){
            res.json({
                success:false,
                statusCode:500,
                data:null,
                msg:'No Such User'
            })
        }else{
            res.json({
                success:false,
                statusCode:500,
                data:{user},
                msg:'User Details Found !'
            })
        }
    }catch(err){
        console.log(err);
        res.json({
            success:false,
            statusCode:500,
            data:null,
            err:err,
            msg:'Request Failed, Please try again later.'
        })
    }
}

async function updateUserDetails(req,res){
    try{
        const {username,age} = req.body
        await User.findByIdAndUpdate(req.params.user_id,{username,age})
        const user = await User.findById(req.params.user_id)
        if(!user){
            res.json({
                success:false,
                statusCode:200,
                data:null,
                msg:'No Such User'
            })
        }else{
            res.json({
                success:true,
                statusCode:200,
                data:{user},
                msg:'User Updated Successfully'
            })
        }
    }catch(err){
        console.log(err);
        res.json({
            success:false,
            statusCode:500,
            data:null,
            err:err,
            msg:'Request Failed, Please try again later.'
        })
    }
}

async function getUserTweets(req,res){
    try{
        console.log(req.params.user_id);
        const articles = await Article.find({author:req.params['user_id']}).populate('author').sort({createdAt: 'desc'})
        if(!articles){
            res.json({
                success:false,
                statusCode:200,
                data:null,
                msg:'No Aricles made by user'
            })
        }else{
            res.json({
                success:false,
                statusCode:200,
                data:articles,
                msg:'Request Successful'
            })
        }
    }catch(err){
        console.log(err);
        res.json({
            success:false,
            statusCode:500,
            data:null,
            err:err,
            msg:'Request Failed, Please try again later.'
        })
    }
}

module.exports = {
    getAllTweets,createTweet,getUserDetails,updateUserDetails,getUserTweets
}

