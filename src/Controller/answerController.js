const { createAnswerDB,
    readAnswerDB,
    updateAnswerDB,
    deleteAnswerDB } = require('../Model/answerModel');

const { readQuestionDB } = require('../Model/questionModel')

module.exports = {
    createAnswer: async (req, res) => {
        try {
            const user_id = req.user.id
            console.log("Controller: user_id", user_id)
            console.log("controller: role", req.user.role)
            const { answer, question_id } = req.body
            console.log("Controller: answer, question_id", answer, question_id)
            if (!question_id || !answer) {
                return res.status(400).send("Please provide question_id and answer")
            }
            // check if user is authorized to update the answer
            if (req.user.role !== "teacher") {
                return res.status(403).send("You are not authorized to create an answer")
            }
            // check if question exists
            const questionDB = await readQuestionDB(question_id)
            if (!questionDB) {
                return res.status(404).send("Question not found")
            }
            const new_answer = await createAnswerDB(user_id, question_id, answer)
            if (!new_answer) {
                return res.status(500).send("Error in creating answer")
            }
            return res.status(200).json(new_answer)
        }
        catch (err) {
            return res.status(500).send(err)
        }
    },
    readAnswer: async (req, res) => {
        try {
            const id = req.params.id
            if (!id) {
                return res.status(400).send("Please provide id")
            }
            const answer = await readAnswerDB(id)
            if (!answer) {
                return res.status(404).send("Answer not found")
            }
            return res.json(answer)
        }
        catch (err) {
            return res.status(500).send(err)
        }
    },
    updateAnswerText: async (req, res) => {
        try {
            const id = req.params.id
            const answer = req.body.answer
            if (!id || !answer) {
                return res.status(400).send("Please provide answer")
            }
            const answerDB = await readAnswerDB(id)
            if (!answerDB) {
                return res.status(404).send("Answer to be updated not found")
            }
            // check if user is authorized to update the answer
            if (answerDB.userId !== req.user.id) {
                return res.status(403).send("You are not authorized to update this answer")
            }
            const updatedAnswer = await updateAnswerDB(id, answer)
            if (!updatedAnswer) {
                return res.status(500).send("Error in updating answer")
            }
            return res.json(updatedAnswer)
        }
        catch (err) {
            return res.status(500).send(err)
        }
    },
    deleteAnswer: async (req, res) => {
        try {
            const id = req.params.id
            if (!id) {
                return res.status(400).send("Please provide id")
            }
            const answerDB = await readAnswerDB(id)
            if (!answerDB) {
                return res.status(404).send("Answer to be deleted not found")
            }
            // check if user is authorized to delete the answer
            if (answerDB.userId !== req.user.id) {
                return res.status(403).send("You are not authorized to delete this answer")
            }
            const deletedAnswer = await deleteAnswerDB(id)
            if (!deletedAnswer) {
                return res.status(500).send("Error in deleting answer")
            }
            return res.json(deletedAnswer)
        }
        catch (err) {
            return res.status(500).send(err)
        }
    }
}