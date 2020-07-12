var express = require('express');
var router = express.Router();
const controller = require('../controller/controller');
const verifyToken = require('../middleware/verifyToken');

router.post('/signup',controller.signup);

router.post('/login',controller.login);

router.post('/tweet',verifyToken.verifyToken,controller.tweet);

router.get('/tweetList',verifyToken.verifyToken,controller.tweetList);

router.put('/updateTweet',verifyToken.verifyToken,controller.updateTweet);

router.delete('/deleteTweet',verifyToken.verifyToken,controller.deleteTweet);

module.exports = router;