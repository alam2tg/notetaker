const express = require("express");
const path = require("path");
const fs = require('fs')
const util =  require('util')
const uuid = require('./helpers/uuid')
const dayjs = require('dayjs')


//setup express
const PORT = 3100;
const app = express();

//setup express app to handle data parsing
app.use(express.json()); // recognizes request object as json object
app.use(express.urlencoded({ extended: true })); //recognizes data as strings/arrays
app.use(express.static("public"));


const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

app.get("/notes", (req, res) =>
	res.sendFile(path.join(__dirname, "./public/notes.html"))
);

app.get("/api/notes", (req, res) => {
	readFromFile('./db/db.json').then((data)=> res.json(JSON.parse(data)))
});

//use post method to call on readAndAppend, post to db.
app.post("/api/notes", (req, res) => {
	console.info(`${req.method} request received to add note`);

	const { title, text } = req.body;
	if (req.body) {
		const newNote = {
			title,
			text,
			note_id: uuid(),
		}
	}
	
})

//  Get route for homepage - * any 'wildcards' (non-specified-routes) will be directed to the homepage.

app.get("*", (req, res) =>
	res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.listen(PORT, () => console.log("server is running"));


