const express = require("express");
const { createQuestion } = require("../Controller/questionController.js");
const authenticateToken = require('../Middleware/authenticateToken')
const router = express.Router();

router.post("/", authenticateToken, createQuestion);
// router.get("/:id", readUser_c);
// router.put("/:id", updateUserName_c);
// router.delete("/:id", deleteUser_c);


module.exports = router;