const apiNotes = require("express").Router();
const uuid = require("../helpers/uuid");
const { readFromFile, readAndAppend, writeToFile } = require("../helpers/fsUtils");

//GET Route for retrieving json data
apiNotes.get("/", (req, res) => {
	readFromFile("./db/notes.json").then((data) => res.json(JSON.parse(data)));
});

//use post method to call on readAndAppend, post to db.
apiNotes.post("/", (req, res) => {
	console.info(`${req.method} request received to add note`);

	const { title, text } = req.body;
	if (req.body) {
		const newNote = {
			title,
			text,
			timestamp: new Date().toString(),
			id: uuid(),
		};
		readAndAppend(newNote, "./db/notes.json");

		const response = {
			status: "success",
			body: newNote,
		};

		res.json(response);
	} else {
		res.json("Error in posting feedback");
	}
});

// apiNotes.delete(`/:id`, (req, res) => {
// 	const { id } = req.params;
// 	const notes = readFromFile("./db/notes.json").then((data)=>res.json(JSON.parse(data)))
// 	notes = notes.filter((note) => note.id !== id)
// 	readAndAppend(notes, "./db/notes.json");
// }) 

//can't get .delete method to work.

module.exports = apiNotes;
