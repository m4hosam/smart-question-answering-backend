const express = require("express");
const { createUser_c, readUser_c, readAllUsers_c, loginUser_c, updateUser_c, deleteUser_c } = require("../Controller/userController.js");
const { authenticateAdmin } = require("../Middleware/authenticateToken.js");
const router = express.Router();

// Route: baseURL/user/

// Creates a user in the database <baseURL/user/>
router.post("/", createUser_c);

// Get all users for only admin
router.get("/", authenticateAdmin, readAllUsers_c);

// Logs a user in with email and password
router.post("/login", loginUser_c);

// Gets a user from the database by its id
router.get("/:id", readUser_c);

// Updates a user's name in the database Only Admin
router.put("/:id", authenticateAdmin, updateUser_c);

// Deletes a user from the database
router.delete("/:id", deleteUser_c);


module.exports = router;