const express = require("express");
const { createQuestion,
    readQuestion,
    readAllQuestions,
    readUserQuestions,
    readPendingQuesions,
    updateQuestionText,
    deleteQuestion } = require("../Controller/questionController.js");
const { createQuestionFromImage } = require("../Controller/uploadQuestionController.js");
const { authenticateToken } = require('../Middleware/authenticateToken')
const router = express.Router();

// Route: baseURL/question/

// Creates a question in the database <baseURL/question/>
router.post("/", authenticateToken, createQuestion);

// Creates a question From image
router.post("/upload", authenticateToken, createQuestionFromImage);

// Gets all questions from the database
router.get("/", readAllQuestions);

// Gets all questions from the database that are associated with the user (student)
router.get("/user", authenticateToken, readUserQuestions);

// Gets all questions from the database that are associated with the teacher (pending questions)
router.get("/teacher", authenticateToken, readPendingQuesions)

// Gets all Teacher question that have been answered
// router.get("/teacher/answered", authenticateToken, readTeacherAnsweredQuestions)

// Gets a question from the database by its id
router.get("/:id", readQuestion);

// Updates a question's text in the database
router.put("/:id", authenticateToken, updateQuestionText);

// Deletes a question from the database
router.delete("/:id", authenticateToken, deleteQuestion);


module.exports = router;