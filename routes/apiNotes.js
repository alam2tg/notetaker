"use strict";
const apiNotes = require("express").Router();
const uuid = require('../helpers/uuid');
const {readFromFile, readAndAppend} = require('../helpers/fsUtils');

const dbPath = '../db/notes.json'
// const db = require('../db/notes.json')

//GET Route for retrieving all the feedback
apiNotes.get('/', (req, res) => {
	console.info(`${req.method} request received for apiNotes`)
	readFromFile('./db/notes.json').then((data)=> res.json(JSON.parse(data)))
});

//use post method to call on readAndAppend, post to db.
apiNotes.post('/', (req, res) => {
	console.info(`${req.method} request received to add note`);

	const { title, text } = req.body;
	if (req.body) {
		const newNote = {
			title,
			text,
			note_id: uuid(),
		};
		readAndAppend(newNote, db);
		res.json('Note added successfully');
	} else {
		res.error('Error in adding tip');
	}
})

module.exports = apiNotes;

