var express = require('express');
var router  = express.Router();
const https = require('https');

router.use(express.json());
router.use(express.urlencoded({extended: false}));

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('sample', { title: 'pagina di sample' });
});

module.exports = router;
