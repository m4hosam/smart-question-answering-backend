const { createUser, readUser, updateUserName, deleteUser } = require('../Model/userModel.js');
const jwt = require('jsonwebtoken');

module.exports = {
    createUser_c: async (req, res) => {
        try {
            const { name, email, password } = req.body
            console.log("Controller: name, email, password", name, email, password)
            // Check if all details are provided
            if (!name || !email || !password) {
                return res.status(400).send("Please provide all details")
            }
            // Check if email already exists
            const userExists = await readUser(email)
            if (userExists) {
                return res.status(400).send("User already exists")
            }
            // Create a new user
            const user = await createUser(name, email, password)
            if (!user) {
                return res.status(400).send("Error in creating User in DB. Please try again")
            }
            user["token"] = jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
            return res.json(user)
        }
        catch (err) {
            return res.status(500).send(err)
        }
    },
    readUser_c: async (req, res) => {
        try {
            const id = req.params.id
            // Check if id is provided
            if (!id) {
                return res.status(400).send("Please provide id")
            }
            const user = await readUser(id)
            if (!user) {
                return res.status(404).send("User not found")
            }
            return res.json(user)
        }
        catch (err) {
            return res.status(500).send(err)
        }
    },
    updateUserName_c: async (req, res) => {
        try {
            const id = req.params.id
            const name = req.body.name
            // Check if id and name is provided
            if (!id || !name) {
                return res.status(400).send("Please provide id and name")
            }
            const user = await updateUserName(id, name)
            if (!user) {
                return res.status(400).send("Error in updating User in DB. Please try again")
            }
            return res.json(user)
        }
        catch (err) {
            return res.status(500).send(err)
        }
    },
    deleteUser_c: async (req, res) => {
        try {
            const id = req.params.id
            const password = req.body.password
            // Check if id and password is provided
            if (!id) {
                return res.status(400).send("Please provide id and password")
            }
            if (!password) {
                return res.status(400).send("Please provide password")
            }
            const user = await readUser(id)
            if (!user) {
                return res.status(404).send("User not found")
            }
            // if password is incorrect
            if (user.password !== password) {
                return res.status(403).send("Password is incorrect")
            }
            // console.log("user", user)
            // Delete the user
            const deletedUser = await deleteUser(id)
            console.log("deletedUser", deletedUser)
            return res.status(200).send("User deleted successfully")
        }
        catch (err) {
            return res.status(500).send(err)
        }
    }
}