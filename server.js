const express = require('express');
const bodyParser = require('body-parser')
var request = require('request');
var read = require('read-file');
const MongoClient = require('mongodb').MongoClient
const app = express();

app.set('view engine', 'ejs');

app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

var db;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, (err, client) => {
    if (err) return console.log(err);
    db = client.db("examen");

    app.listen(3000, () => {
        console.log("poort 3000 werkt");

    })

})


app.get("/", (req, res) => {
    db.collection("overtredingen").find().toArray((err, result) => {
        res.render("index.ejs", {
            examens: result
        })
    })
})