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

        if(!title || !desc){
            return res.json({
                success:false,
                statusCode:200,
                data:null,
                msg:'Title (or) Description Empty !'
            })
        }

        console.log(req.body);
        
        const newArticle = Article({
            title,
            desc,
            author:_id,
            createdAt:Date.now(),
            likes:0
        })
        
        const article = await newArticle.save()
        const user = await User.findByIdAndUpdate(_id,{$push:{articles:article._id}})
        console.log(user);
        res.json({
            success:true,
            statusCode:200,
            data:{article},
            msg:'Tweet Sent Successfully'
        })

    }catch(err){
        console.log(err);

        res.json({
            success:false,
            statusCode:500,
            data:null,
            msg:'Couldn\'t send Tweet, Please Try again after some time'
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

async function likeDislikeTweet(req,res){
    const userId = req.body.uid; 
    
  try {
    const article = await Article.findById(req.body.tweet_id);

    if (!article) {
      return res.status(404).json({ success:false, msg: 'Article not found' });
    }

    const user = await User.findById(userId)

    if(!user){
        return res.status(404).json({success:false, msg:'User not found'})
    }
    
    const isLikedByUser = article.likedBy.includes(user._id);
    console.log(article);
    let setLike = false
    if (isLikedByUser) {
      
        article.likes--;
        for (var i = article.likedBy.length - 1; i >= 0; i--) {
            if (article.likedBy[i] == userId) {
                article.likedBy.splice(i, 1);
            }
        }
    } else {
      article.likes++;
      article.likedBy.push(userId);
      setLike = true
    }
    console.log(article);

    await article.save();

    res.status(200).json({ success:true, setLike});
  } catch (err) {
    console.log(err)
    res.status(500).json({ success:false, msg: 'Server Error' });
  }
}

module.exports = {
    getAllTweets,createTweet,getUserDetails,updateUserDetails,getUserTweets,likeDislikeTweet
}

