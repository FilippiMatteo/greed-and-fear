var express = require('express');
var router  = express.Router();
const https = require('https');

router.use(express.json());
router.use(express.urlencoded({extended: false}));


/* GET home page. */
router.get('/', function (req, res, next) {
    let data   = '';
    let prices = '';

    https.get('https://api.alternative.me/fng/?limit=0', (resp) => {

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {

            var date = new Date().toISOString().substr(0, 10);

            console.log(date);
            var url = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-02-01&end=' + date;
            console.log(url);

            https.get(url, (resp) => {

                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    prices += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    //    console.dir(data);

                    res.render('fgBTC', {
                        title : 'Fear and Greed BTC',
                        data  : data,
                        prices: prices
                    });
                });


            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });
        });


    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

module.exports = router;
