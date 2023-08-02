const express = require("express");
const path = require("path");
const api = require('./routes/index.js')

//setup express
const PORT = process.env.PORT || 80
const app = express();

//setup express app to handle data parsing
app.use(express.json()); // recognizes request object as json object
app.use(express.urlencoded({ extended: true })); //recognizes data as strings/arrays
app.use('/api', api);

app.use(express.static("public"));

//Route for homepage
app.get('/', (req,res) => 
	res.sendFile(path.join(__dirname, "./public/index.html"))
)


//Route for notes
app.get("/notes", (req, res) =>
	res.sendFile(path.join(__dirname, "./public/notes.html"))
);

//  Get route for homepage - * any 'wildcards' (non-specified-routes) will be directed to the homepage.
app.get("*", (req, res) =>
	res.sendFile(path.join(__dirname, "./public/index.html"))
);


app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));


