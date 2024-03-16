const express = require("express");
const { createUser_c, readUser_c, loginUser_c, updateUserName_c, deleteUser_c } = require("../Controller/userController.js");

const router = express.Router();

// Route: baseURL/user/

// Creates a user in the database <baseURL/user/>
router.post("/", createUser_c);

// Logs a user in with email and password
router.post("/login", loginUser_c);

// Gets a user from the database by its id
router.get("/:id", readUser_c);

// Updates a user's name in the database
router.put("/:id", updateUserName_c);

// Deletes a user from the database
router.delete("/:id", deleteUser_c);


module.exports = router;