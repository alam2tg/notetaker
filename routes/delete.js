"use strict";
const express = require('express');
let router = express.Router();

router.delete('./db/db.json/:user_id', (req, res) => {
	const id = req.params.user_id;
})
