const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');

var app = express();

app.get('/:id', function(req, res) {
    var id = req.params.id;
    var date = new Date();
    res.status(200).send(`
    <head>
        <meta property="og:title" content="Minipractice" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://minipractice.net" />
        <meta property="og:image" content="https://i.ibb.co/${id}/image.png" />
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
        <img src="https://i.ibb.co/${id}/image.png" style="display: block;-webkit-user-select: none;margin: auto;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;" />
    </body>
    `)
})

app.listen(3000, function() {
    console.log('listening on 3000');
})