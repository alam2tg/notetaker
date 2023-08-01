const apiNotes = require('express').Router();
const uuid = require('../helpers/uuid');
const {readFromFile, readAndAppend} = require('../helpers/fsUtils');

//GET Route for retrieving json data
apiNotes.get('/', (req, res) => {
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
			timestamp: new Date().toString(),
			id: uuid()
		}
		readAndAppend(newNote, './db/notes.json');

		const response = {
			status: 'success',
			body: newNote,
		 };
	
		 res.json(response);

	  } else {
		 res.json('Error in posting feedback');
	  }
})


// apiNotes.delete('/db/notes/:id', (req,res) => {
//		delete newNote.id
// 	res.send(`${res.method}`)
// 	if (req.body) 
// })

module.exports = apiNotes;

