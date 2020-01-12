var express = require('express');
var router  = express.Router();
const axios = require('axios');

router.use(express.json());
router.use(express.urlencoded({extended: false}));

router.get('/', function (req, res, next) {
    res.render('fgBTC', {title: 'Fear and Greed BTC'});
});

router.post('/downloadJson', function (req, res, next) {
    let url  = "https://api.alternative.me/fng/?limit=0";
    var date = new Date().toISOString().substr(0, 10);

    var urlBTC = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-02-01&end=' + date;


    axios.all([
        axios.get(url),
        axios.get(urlBTC),

    ]).then(axios.spread((responseFG, responseBTC) => {


        res.json({
            fg : responseFG.data.data,
            bpi: responseBTC.data.bpi,
            dataHistory: createDataHistory(responseFG.data.data),

        });

    })).catch(error => {
        console.log(error);
    });

});


function createDataHistory(data) {
    return {
        "now"       : {
            "value"               : data[0].value,
            "value_classification": data[0].value_classification
        },
        "yesterday" : {
            "value"               : data[1].value,
            "value_classification": data[1].value_classification
        },
        "last_week" : {
            "value"               : data[7].value,
            "value_classification": data[7].value_classification
        },
        "last_mouth": {
            "value"               : data[30].value,
            "value_classification": data[30].value_classification
        },
        "last_year" : {
            "value"               : data[365].value,
            "value_classification": data[365].value_classification
        }
    }
}

module.exports = router;
