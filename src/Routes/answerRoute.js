const express = require("express");
const { createAnswer,
    readAnswer,
    updateAnswerText,
    deleteAnswer } = require("../Controller/answerController.js");

const { authenticateToken } = require('../Middleware/authenticateToken')

const router = express.Router();

router.post("/", authenticateToken, createAnswer);
router.get("/:id", readAnswer);
router.put("/:id", authenticateToken, updateAnswerText);
router.delete("/:id", authenticateToken, deleteAnswer);

module.exports = router;