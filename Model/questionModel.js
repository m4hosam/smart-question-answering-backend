const prisma = require('../prismadb');

module.exports = {
    createQuestionDB: async (user_id, question, category) => {
        try {
            const newQuestion = await prisma.question.create({
                data: {
                    question,
                    category,
                    user: { connect: { id: user_id } },
                }
            })
            return newQuestion;
        }
        catch (err) {
            console.log("Error in createQuestion", err);
            return null;
        }
    },
    readQuestionDB: async (id) => {
        try {
            const question = await prisma.question.findUnique({
                where: {
                    id: id,
                }
            })
            return question;
        }
        catch (err) {
            console.log("error in readQuestion", err);
            return null;
        }
    },
    updateQuestionTextDB: async (id, question) => {
        try {
            const updatedQuestion = await prisma.question.update({
                where: {
                    id: id,
                },
                data: {
                    question,
                }
            })
            return updatedQuestion;
        }
        catch (err) {
            console.log("error in updateQuestion", err);
            return null;
        }
    },
    updateQuestionCategoryDB: async (id, category) => {
        try {
            const updatedQuestion = await prisma.question.update({
                where: {
                    id: id,
                },
                data: {
                    category,
                }
            })
            return updatedQuestion;
        }
        catch (err) {
            console.log("error in updateQuestion", err);
            return null;
        }
    },
    updateQuestionStatusDB: async (id, status) => {
        try {
            const updatedQuestion = await prisma.question.update({
                where: {
                    id: id,
                },
                data: {
                    status,
                }
            })
            return updatedQuestion;
        }
        catch (err) {
            console.log("error in updateQuestion", err);
            return null;
        }
    },
    deleteQuestionDB: async (id) => {
        try {
            const deletedQuestion = await prisma.question.delete({
                where: {
                    id: id,
                }
            })
            return deletedQuestion;
        }
        catch (err) {
            console.log("error in deleteQuestion", err);
            return null;
        }
    }
}