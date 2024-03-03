const express = require("express");
const { createUser_c, readUser_c, updateUserName_c, deleteUser_c } = require("../Controller/userController.js");

const router = express.Router();

router.post("/", createUser_c);
router.get("/:id", readUser_c);
router.put("/:id", updateUserName_c);
router.delete("/:id", deleteUser_c);


module.exports = router;