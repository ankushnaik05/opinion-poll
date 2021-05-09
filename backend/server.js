const express = require('express');
var bodyParser = require('body-parser');
var sessionstorage = require('sessionstorage');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
var jsonParser = bodyParser.json()

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/fetch-votes', (re, res) => {

    let vote = {
        'Miguel de Cervantes': sessionstorage.getItem('Miguel de Cervantes'),
        'Charles Dickens': sessionstorage.getItem('Charles Dickens'),
        'J.R.R. Tolkien': sessionstorage.getItem('J.R.R. Tolkien'),
        'Antoine de Saint-Exuper': sessionstorage.getItem('Antoine de Saint-Exuper')
    }
    res.send({ vote });
});

app.post('/add-vote', jsonParser, (req, res) => {
    console.log(req.body);
    let getVote = sessionstorage.getItem(req.body.item);
    if (getVote == null) {
        getVote = 1;
    } else {
        getVote++;
    }
    sessionstorage.setItem(req.body.item, parseInt(getVote));
    res.send({ 'status': 'ok' })
});


app.listen(3000, () => console.log('listening on port 3000...'));
