var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('fgSP500', { title: 'Fear and Greed S&P 500' });
});

module.exports = router;
