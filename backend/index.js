const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());

app.get('/', function(req, res) {
    res.json( {mssg: "Hello this is working"});
})

app.get('/tweets', function (req, res) {
    res.json([{
        "id": "1",
        "user": "First Last",
        "username": "@first.last",
        "content": "This is my new tweet",
        "likes": 125,
        "comments": 158,
        "reposts": 55
    },
    {
        "id": "2",
        "user": "First Second",
        "username": "@first.second",
        "content": "This is my new second tweet",
        "likes": 25,
        "comments": 58,
        "reposts": 5
    },]);
});

app.post('/tweets', function (req, res) {
    res.json(
        {
            "id": "1",
            "user": "First Last",
            "username": "@first.last",
            "content": "This is my tweet",
            "likes": 125,
            "comments": 158,
            "reposts": 55
        });
});



const server = app.listen(8000, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
})  