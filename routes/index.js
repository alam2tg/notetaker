//apiNotes.js
const express = require('express');

const apiNotesRouter = require('./apiNotes');

const app = express()

app.use('./apiNotes', apiNotesRouter);

// module.exports = app