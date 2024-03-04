const { createQuestionDB,
    getQuestionDB,
    getQuestionTextDB,
    updateQuestionCategoryDB,
    updateQuestionStatusDB,
    deleteQuestionDB } = require('../Model/questionModel');



module.exports = {
    createQuestion: async (req, res) => {
        try {
            // get user_id from auth middleware
            const user_id = req.user.id
            console.log("Controller: user_id", user_id)
            const { question, category } = req.body
            console.log("Controller: question, category", question, category)
            res.send("Question created")
        }
        catch (err) {
            return res.status(500).send(err)
        }
    }
}