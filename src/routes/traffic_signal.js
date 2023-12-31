const router = require('express').Router();
const passport = require('passport');
const authenticate = require('./custom_authenticate')
const _ = require('lodash')
const Log = require('../models/log')

router.use('/live',(req,res)=>{res.sendStatus(200)})

router.use(async (req,res,next)=>{

  const newLog = new Log({
      cat:new Date(),
      method:req.method,
      url:req.path,
      ip:req.ip  
  })
  newLog.save().then(()=>{console.log("log saved successfully",newLog);})
  next()
})

router.use('/auth',require('./auth_routes'))

router.use('/api',authenticate,require('./dashboard_routes'))

router.use((err, req, res, next) => {
    let responseStatusCode = 500;
    
    console.log(err.toString());

    let responseObj = {
      success: false,
      data: null,
      error: err.toString(),
      message: 'Please Login to resolve this error.',
    };
    if (!_.isNil(err)) {
      if (err.name === 'JsonWebTokenError') {
        responseStatusCode = 401;
        responseObj.message = 'You cannot get the details. You are not authorized to access this protected resource';
      }
    }

    if (!res.headersSent) {
      res.status(responseStatusCode).json(responseObj);
    }
  });

module.exports = router