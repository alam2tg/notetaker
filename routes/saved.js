"use strict";
const express = require("express");
let router = express.Router();

// router.use(function(req, res, next) {
// 	console.log(req.url, "@", Date.now());
// 	next();
// })

router
	.route("/notes")
	.get((req, res) => {
		readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
	})
	.post("/notes", (req, res) => {
		console.info("request receieved to add note");

		const { title, text } = req.body;
		if (req.body) {
			const newNote = {
				title,
				text,
				note_id: uuid(),
			};
			readAndAppend(newNote, "./db/db.json");
			res.json("Note added successfully");
		} else {
			res.error("Error in adding note");
		}
	});
