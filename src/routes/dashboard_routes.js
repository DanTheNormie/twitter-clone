const mongoose = require('mongoose');
const router = require('express').Router();   

const dashboard_controller = require('../controllers/dashboard-controller');
const passport = require('passport');

router.get('/getAllTweets', dashboard_controller.getAllTweets);

router.post('/createTweet', dashboard_controller.createTweet)

router.get('/users/:user_id',dashboard_controller.getUserDetails)

router.get('/users/:user_id/tweets',dashboard_controller.getUserTweets)

router.patch('/users/:user_id',dashboard_controller.updateUserDetails)

module.exports = router;