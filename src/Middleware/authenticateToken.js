const jwt = require('jsonwebtoken');



module.exports = {
    authenticateToken: (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader?.split(' ')[1]
        // console.log("Middleware: token", token)
        if (token == null) return res.sendStatus(401)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            console.log("Middleware: user", user)
            if (err) return res.sendStatus(403)
            req.user = user
            next()
        })
    },
    authenticateTeacher: (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader?.split(' ')[1]
        // console.log("Middleware: token", token)
        if (token == null) return res.sendStatus(401)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            console.log("Middleware: user", user)
            if (err) return res.sendStatus(403)
            if (user.role !== "teacher") {
                return res.status(403).send("You are not authorized to perform this action")
            }
            req.user = user
            next()
        })
    },
    authenticateAdmin: (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader?.split(' ')[1]
        // console.log("Middleware: token", token)
        if (token == null) return res.sendStatus(401)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            console.log("Middleware: user", user)
            if (err) return res.sendStatus(403)
            if (user.role !== "admin") {
                return res.status(403).send("You are not authorized to perform this action")
            }
            req.user = user
            next()
        })
    }
}

