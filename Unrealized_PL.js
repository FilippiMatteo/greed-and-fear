var express = require('express');
var router  = express.Router();
var axios   = require("axios");
const fs    = require('fs');

router.get('/', function (req, res, next) {
    res.render('Unrealized_PL', {
        title: 'Unrealized Profit/Loss\''
    });

});

router.post('/downloadJson', function (req, res, next) {

    var API_Key   = "bc457eba-18e3-4597-a8f1-ecba15bc139a";
    var startDateSince=  req.body.isMobileDevice ? new Date("2017-07-17").getTime()/ 1000 : 0;

        let url       = "https://api.glassnode.com/v1/metrics/indicators/net_unrealized_profit_loss?a=btc&api_key=" + API_Key + "&s="+startDateSince;
    console.dir(url)
    var endDate   = new Date().toISOString().substr(0, 10);
    var startDateBTC = req.body.isMobileDevice ? "2017-07-17" : "2010-07-17";
    var urlBTC    = 'https://api.coindesk.com/v1/bpi/historical/close.json?start='+startDateBTC+'&end=' + endDate;
    //  var urlBTC = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-11-17&end=' + date;


    axios.all([
        axios.get(url),
        axios.get(urlBTC),
    ]).then(axios.spread((response1, responseBTC) => {
        let t = [];
        let v = [];
        for (let i = 0; i < response1.data.length; i++) {
            t.push(response1.data[i].t);
            v.push(response1.data[i].v);
        }
        res.json({
            t  : t,
            v  : v,
            BTC: responseBTC.data.bpi,
        });

    })).catch(error => {
        console.log(error);
    });

});


module.exports = router;
