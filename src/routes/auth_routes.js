const mongoose = require('mongoose');
const router = require('express').Router();   

const auth_controller = require('../controllers/auth-controller');
const passport = require('passport');


router.get('/protected',passport.authenticate('jwt',{session:false}),(req, res, next) => {
    res.status(200).json({success:true, msg:'You are authorized!'})
});

router.post('/login', auth_controller.login);

router.post('/register', auth_controller.register);

module.exports = router;