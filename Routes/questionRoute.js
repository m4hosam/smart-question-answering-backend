const express = require("express");
const { createQuestion,
    readQuestion,
    readAllQuestions,
    readUserQuestions,
    readPendingQuesions,
    updateQuestionText,
    deleteQuestion } = require("../Controller/questionController.js");
const { authenticateToken } = require('../Middleware/authenticateToken')
const router = express.Router();

router.post("/", authenticateToken, createQuestion);
router.get("/", readAllQuestions);
router.get("/user", authenticateToken, readUserQuestions);
router.get("/teacher", authenticateToken, readPendingQuesions)
router.get("/:id", readQuestion);
router.put("/:id", authenticateToken, updateQuestionText);
router.delete("/:id", authenticateToken, deleteQuestion);


module.exports = router;