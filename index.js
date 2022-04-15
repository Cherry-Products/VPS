const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const bodyParser = require("body-parser");
const { default: axios } = require('axios');


var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/:id/:id2', function(req, res) {
    var id = req.params.id;
    var id2 = req.params.id2
    var date = new Date();
    res.status(200).send(`
    <head>
        <meta property="og:title" content="Minipractice" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://minipractice.net" />
        <meta property="og:image" content="https://i.ibb.co/${id}/${id2}" />
        <meta name="theme-color" content="#5865F2">
        <meta name="twitter:card" content="summary_large_image">
        <meta property="og:description" content="${date}" />
    </head>

    <body style="margin: 0px; background: #0e0e0e; height: 100%">
        <style>
            body {
                overflow: hidden;
                margin: 0px;
            }
        </style>
        <img src="https://i.ibb.co/${id}/${id2}" style="display: block;-webkit-user-select: none;margin: auto;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;" />
    </body>
    `)
})

//redirect '/' to https://minipractice.net

app.get('/', function(req, res) {
    res.redirect('https://minipractice.net');
})

app.use((req, res, next) => {
    res.status(404);
    res.redirect('https://minipractice.net')
})

app.post('/upload', function(req, res) {
    var image = req.body.image;
    let bodyfetch = new FormData()
    bodyfetch.set('key', 'fc3b6f137cc0b412de8feddaee643ea0')
    bodyfetch.append('image', image)
    axios({
        method: 'post',
        url: 'https://api.imgbb.com/1/upload',
        data: bodyfetch
    }).then(function(response) {
        var baseurl = response.data.data.display_url;
        var url = baseurl.replace('https://i.ibb.co/', '');
        url = "https://img.minipractice.net/" + url;
        res.status(200);
        res.redirect(url);
    })
})

app.listen(5000, function() {
    console.log('listening on 5000');
})