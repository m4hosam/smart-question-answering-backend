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
            const new_question = await createQuestionDB(user_id, question, category)
            if (!new_question) {
                return res.status(400).send("Error in creating question")
            }
            return res.status(200).json(new_question)
        }
        catch (err) {
            return res.status(500).send(err)
        }
    }
}