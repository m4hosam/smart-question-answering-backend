const prisma = require('../prismadb');

module.exports = {
    createAnswerDB: async (user_id, question_id, answer) => {
        try {
            const newAnswer = await prisma.answer.create({
                data: {
                    answer,
                    user: { connect: { id: user_id } },
                    question: { connect: { id: question_id } },
                }
            })
            // update question status to answered
            await prisma.question.update({
                where: {
                    id: question_id,
                },
                data: {
                    status: "answered",
                }
            })
            return newAnswer;
        }
        catch (err) {
            console.log("Error in createAnswer", err);
            return null;
        }
    },
    readAnswerDB: async (id) => {
        try {
            const answer = await prisma.answer.findUnique({
                where: {
                    id: id,
                }
            })
            return answer;
        }
        catch (err) {
            console.log("error in readAnswer", err);
            return null;
        }
    },
    updateAnswerDB: async (id, answer) => {
        try {
            const updatedAnswer = await prisma.answer.update({
                where: {
                    id: id,
                },
                data: {
                    answer,
                }
            })
            return updatedAnswer;
        }
        catch (err) {
            console.log("error in updateAnswer", err);
            return null;
        }
    },
    deleteAnswerDB: async (id) => {
        try {
            const answer = await prisma.answer.delete({
                where: {
                    id: id,
                }
            })
            return answer;
        }
        catch (err) {
            console.log("error in deleteAnswer", err);
            return null;
        }
    }
}