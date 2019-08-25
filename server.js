const express = require('express');
const bodyParser = require('body-parser')
var request = require('request');
const MongoClient = require('mongodb').MongoClient
const app = express();

app.set('view engine', 'ejs');

app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))


var db;
var url = "mongodb://localhost:27017/"

MongoClient.connect(url, (err, client) => {
    if (err) return console.log(err);
    db = client.db("examen");

    app.listen(3000, () => {
        console.log("poort 3000 werkt");
    })
})


app.get("/", (req, res) => {
    db.collection("inhaal").find().toArray((err, result) => {
        if (err) return console.log(err);
        //console.log(result[0].body);

        res.render("index.ejs", {
            namen: result
        })
    })

})

app.get("/search", (req, res) => {
    //console.log(req);

    res.render("search.ejs", {
        student: {}
    })
})

app.post("/search", (req, res) => {
    query = {
            naam: req.body.naam
        }
        //console.log(query);

    db.collection("inhaal").find({
        "body": {
            naam: req.body.naam
        }
    }, (err, result) => {
        if (err) return console.log(err);
        // console.log(result);

        res.render("search.ejs", {
            student: result
        })
    })



})


app.post("/aanvraag", (req, res) => {
    //console.log(req.body);
    //req.body
    query = {
        'naam': req.body.naam,
        'examen': req.body.examen,
        'reden': req.body.reden
    };

    db.collection("inhaal").save({
        _id: query,
        body: req.body
    }, (err, result) => {
        if (err) return console.log(err);
        //console.log(result);
        //res.redirect("/");
        res.render("search.ejs", {
            student: result
        })
    })
})





// student: {
//     'naam': req.body.naam,
//     'examen': req.body.examen,
//     'reden': req.body.reden,
//     'datinex': req.body.datinex
// }

// db.collection("inhaal").updateOne({
//     'naam': req.body.naam,
//     'examen': req.body.examen,
//     'reden': req.body.reden
// }, {
//     body: req.body
// }, {
//     upsert: true
// }, (err, result) => {
//     if (err) return console.log(err);
//     res.redirect("/")

// })