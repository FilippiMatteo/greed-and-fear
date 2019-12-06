var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('ATBTC', { title: 'analisi tecnica btc' });
});

module.exports = router;
