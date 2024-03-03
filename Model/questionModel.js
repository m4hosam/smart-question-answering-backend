import prisma from '../prismadb';

module.exports = {
    createQuestion: async (user_id, question, category) => {
        try {
            const newQuestion = await prisma.question.create({
                data: {
                    user_id,
                    question,
                    category
                }
            })
            return newQuestion;
        }
        catch (err) {
            console.log("Error in createQuestion", err);
            return null;
        }
    },
    readQuestion: async (id) => {
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
    updateQuestionText: async (id, question) => {
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
    updateQuestionCategory: async (id, category) => {
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
    updateQuestionStatus: async (id, status) => {
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
    deleteQuestion: async (id) => {
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