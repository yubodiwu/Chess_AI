"use strict";

const express = require('express');
const PORT = 8000;

// create our app
var app = express();

app.use(express.static("public"));

app.listen(PORT, function() {
    console.log(`listening on ${PORT}`);
})