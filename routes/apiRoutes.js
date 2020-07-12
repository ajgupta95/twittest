var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/user',require('../api/modules/user/routes/routes'))

module.exports = router;
