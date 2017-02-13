"use strict";

const express = require('express');
const PORT = process.env.PORT || 3001;

// create our app
var app = express();

app.use(express.static("public"));

app.listen(PORT, function() {
    console.log(`listening on ${PORT}`);
})
