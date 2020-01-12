var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('blockChainInfo', { title: 'Some charts from blockchain.info' });
});

router.post('/downloadJson', function (req, res, next) {
    var isMobileDevice = JSON.parse(req.body.isMobileDevice);
    let startDate= !isMobileDevice ? "2016-01-01" : "2010-08-17";


    let url     = "https://api.blockchain.info/charts/cost-per-transaction?timespan=all&start="+startDate;
    var date    = new Date().toISOString().substr(0, 10);

    var urlBTC = 'https://api.coindesk.com/v1/bpi/historical/close.json?start='+startDate+'&end=' + date;
    console.log(urlBTC);
    //  var urlBTC = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-11-17&end=' + date;


    axios.all([
        axios.get(url),
        axios.get(urlBTC),

    ]).then(axios.spread((response1, responseBTC) => {
        let t = [];
        let v = [];
        // console.dir(response1);
        for (let i = 0; i < response1.data.values.length; i++) {
            t.push(response1.data.values[i].x);
            v.push(response1.data.values[i].y);
        }
        res.json({
            t    : t,
            v    : v,
            BTC  : responseBTC.data.bpi,
        });

    })).catch(error => {
        console.log(error);
    });

});



module.exports = router;
