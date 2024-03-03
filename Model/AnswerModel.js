import prisma from '../prismadb';

module.exports = {
    createAnswer: async (user_id, question_id, answer) => {
        try {
            const newAnswer = await prisma.answer.create({
                data: {
                    user_id,
                    question_id,
                    answer
                }
            })
            return newAnswer;
        }
        catch (err) {
            console.log("Error in createAnswer", err);
            return null;
        }
    },
    readAnswer: async (id) => {
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
    updateAnswer: async (id, answer) => {
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
    deleteAnswer: async (id) => {
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