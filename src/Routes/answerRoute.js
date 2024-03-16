const express = require("express");
const { createAnswer,
    readAnswer,
    updateAnswerText,
    deleteAnswer } = require("../Controller/answerController.js");

const { authenticateToken } = require('../Middleware/authenticateToken')

const router = express.Router();

// Route: baseURL/answer/

// Creates an answer in the database <baseURL/answer/>
router.post("/", authenticateToken, createAnswer);

// Gets an answer from the database by its id
router.get("/:id", readAnswer);

// Updates an answer's text in the database
router.put("/:id", authenticateToken, updateAnswerText);

// Deletes an answer from the database
router.delete("/:id", authenticateToken, deleteAnswer);

module.exports = router;