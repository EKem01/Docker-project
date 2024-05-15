var express = require('express');
var path = require('path');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/get-profile', function (req, res) {
    var response = res;

    MongoClient.connect('mongodb://mongoadmin:secert@localhost:27017/', function (err, db) {
        if (err) throw err;

        var db = client.db('user-account');
        var query = { userid: 1};
        db.collection('users').findOne(query, function (err, result) {
            if (err) throw err;
            response.send(result);
            client.close();
        });

    });
});

app.post('/update-profile', function (req, res) {
    var userObj = req.body;
    var response = res;

    console.log('connecting to the db...');

    MongoClient.connect('mongodb://mongoadmin:secert@localhost:27017/', function (err, db) {
        if (err) throw err;

        var db = client.db('user-account');
        userObj['userid'] = 1
        var query = { $set: userObj };

        console.log('successully connected to the user-account');

        db.collection('users').updateOne(query, newValues, {upset: true}, function  (err, result) {
            if (err) throw err;
            console.log('successully updated');
            response.send(userObj);
            client.close();
        });
    });
});

app.get('/profile-picture', function (req, res) {
    var img = fs.readFileSync('profile-2.jpg');
    res.writeHead(200, {'Content-Type': 'image/jpg'});
    res.end(img, 'binary');

});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});