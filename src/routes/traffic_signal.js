const router = require('express').Router();

router.use('/auth',require('./auth_routes'))

module.exports = router