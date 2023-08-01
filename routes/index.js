//apiNotes.js
const express = require('express');
const apiNotes = require('./apiNotes');

const app = express();

app.use('/notes', apiNotes);

module.exports = app;