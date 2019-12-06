var express = require('express');
var path    = require('path');

var cors = require('cors');


// use it before all route definitions

var indexRouter  = require('./routes/index');
var usersRouter  = require('./routes/users');
var sampleRuoter = require('./routes/sample');

var fgBTCRouter         = require('./routes/fgBTC');
var ATBTCRuoter         = require('./routes/ATBTC');
var fgSP500Ruoter       = require('./routes/fgSP500');
var Unrealized_PLRuoter = require('./routes/Unrealized_PL');

var app = express();

app.use(cors({origin: '*'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', sampleRuoter);
app.use('/users', usersRouter);
app.use('/sample', sampleRuoter);
app.use('/fgBTC', fgBTCRouter);
app.use('/fgSP500', fgSP500Ruoter);
app.use('/ATBTC', ATBTCRuoter);
app.use('/Unrealized_PL', Unrealized_PLRuoter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.send("errore 404");
    next();
});


app.listen(8888, function () {
    console.log("server listener on 8888")
});

module.exports = app;
