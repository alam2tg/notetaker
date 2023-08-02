//apiNotes.js
const express = require('express');
const apiNotes = require('./apiNotes');

const app = express();

app.use('/notes', apiNotes); // calls middleware apiNotes to be called at /notes path.

module.exports = app;