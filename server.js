const express = require("express");
const path = require("path");
const fs = require('fs')
const util =  require('util')
const uuid = require('./helpers/uuid')

//setup express
const PORT = 3100;
const app = express();

//setup express app to handle data parsing
app.use(express.json()); // recognizes request object as json object
app.use(express.urlencoded({ extended: true })); //recognizes data as strings/arrays
app.use(express.static("public"));

const readFromFile = util.promisify(fs.readFile)  ;

const writeToFile = ('./db/db.json', content) =>
  fs.writeFile('./db/db.json', JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${'./db/db.json'}`)
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

app.post("/api/notes", (req, res) => {
	console.info(`${req.method} request received to add note`);
	
})

app.get("*", (req, res) =>
	res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.listen(PORT, () => console.log("server is running"));


