const { createQuestionDB,
    readQuestionDB,
    readAllQuestions,
    readUserQuestions,
    updateQuestionTextDB,
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
    },
    readQuestion: async (req, res) => {
        try {
            const id = req.params.id
            if (!id) {
                return res.status(400).send("Please provide id")
            }
            const question = await readQuestionDB(id)
            if (!question) {
                return res.status(404).send("Question not found")
            }
            return res.json(question)
        }
        catch (err) {
            return res.status(500).send(err)
        }
    },
    readAllQuestions: async (req, res) => {
        try {
            const questions = await readAllQuestions()
            if (!questions) {
                return res.status(404).send("No questions found")
            }
            return res.json(questions)
        }
        catch (err) {
            return res.status(500).send(err)
        }
    },
    readUserQuestions: async (req, res) => {
        try {
            const user_id = req.user.id
            // console.log("Controller: user_id", user_id)
            const questions = await readUserQuestions(user_id)
            if (!questions) {
                return res.status(404).send("No questions found")
            }
            return res.json(questions)
        }
        catch (err) {
            return res.status(500).send(err)
        }
    },
    updateQuestionText: async (req, res) => {
        try {
            const id = req.params.id
            const question = req.body.question
            if (!id || !question) {
                return res.status(400).send("Please provide question")
            }
            const questionDB = await readQuestionDB(id)
            if (!questionDB) {
                return res.status(404).send("Question to be updated not found")
            }
            // check if user is authorized to update the question
            if (questionDB.userId !== req.user.id) {
                return res.status(403).send("You are not authorized to update this question")
            }
            const updatedQuestion = await updateQuestionTextDB(id, question)
            if (!updatedQuestion) {
                return res.status(400).send("Error in updating Question in DB. Please try again")
            }
            return res.json(updatedQuestion)
        }
        catch (err) {
            return res.status(500).send(err)
        }
    },
    updateQuestionCategory: async (req, res) => {
        try {
            const id = req.params.id
            const category = req.body.category
            if (!id || !category) {
                return res.status(400).send("Please provide category")
            }
            const questionDB = await readQuestionDB(id)
            if (!questionDB) {
                return res.status(404).send("Question to be updated not found")
            }
            // check if user is authorized to update the question
            if (req.user.role !== 'teacher') {
                return res.status(403).send("You are not authorized to update this question")
            }
            const updatedQuestion = await updateQuestionCategoryDB(id, category)
            if (!updatedQuestion) {
                return res.status(400).send("Error in updating Question in DB. Please try again")
            }
            return res.json(updatedQuestion)
        }
        catch (err) {
            return res.status(500).send(err)
        }
    },
    updateQuestionStatus: async (req, res) => {
        try {
            const id = req.params.id
            const status = req.body.status
            if (!id || !status) {
                return res.status(400).send("Please provide status")
            }
            const questionDB = await readQuestionDB(id)
            if (!questionDB) {
                return res.status(404).send("Question to be updated not found")
            }
            // check if user is authorized to update the question
            if (req.user.role !== 'teacher') {
                return res.status(403).send("You are not authorized to update this question")
            }
            const updatedQuestion = await updateQuestionStatusDB(id, status)
            if (!updatedQuestion) {
                return res.status(400).send("Error in updating Question in DB. Please try again")
            }
            return res.json(updatedQuestion)
        }
        catch (err) {
            return res.status(500).send(err)
        }
    },
    deleteQuestion: async (req, res) => {
        try {
            const id = req.params.id
            if (!id) {
                return res.status(400).send("Please provide id")
            }
            const questionDB = await readQuestionDB(id)
            if (!questionDB) {
                return res.status(404).send("Question not found")
            }
            // check if user is authorized to update the question
            if (questionDB.userId !== req.user.id) {
                return res.status(403).send("You are not authorized to delete this question")
            }
            const deletedQuestion = await deleteQuestionDB(id)
            if (!deletedQuestion) {
                return res.status(500).send("Error in deleting Question in DB.")
            }
            return res.json(deletedQuestion)
        }
        catch (err) {
            return res.status(500).send(err)
        }
    }
}