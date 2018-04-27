var express = require('express'),
    app = express(),
    sse = require('./sse');

var connections = [],
    votes = {yes: 0, no: 0};

app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');

app.use(sse);

app.get('/', function(req, res) {
    res.render('vote')
});

app.get('/stuff', function(req, res) {
    let thing = {
        test: 'things'
    };
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(JSON.stringify(thing))
});

app.get('/stufftwo', function(req, res) {
    let thing = {
        test: 'things'
    };
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(JSON.stringify(thing))
});

app.get('/result', function(req, res) {
    res.render('result')
});

app.get('/vote', function(req, res) {
    if (req.query.yes === "true") votes.yes++;
    else votes.no++;

    for(var i = 0; i < connections.length; i++) {
        connections[i].sseSend(votes);
    }

    res.sendStatus(200);
});

let count = 0;

app.get('/stream', function(req, res) {
    count += 1;
    res.sseSetup();
    res.sseSend(count);
    connections.push(res);
});

app.listen(3000, function() {
    console.log('Listening on port 3000...')
})