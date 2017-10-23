var express = require('express');
var router = express.Router();

router.use('/servers/', require('./servers'));

module.exports = router;
