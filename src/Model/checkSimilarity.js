const prisma = require('../prismadb');

// Function to find the most similar question
async function findSimilarQuestion(category, question) {
    // Check if there are similar questions in the database
    const existingQuestions = await prisma.question.findMany({
        where: {
            category: category
        },
        select: {
            question: true,
            id: true
        }
    });
    // console.log("Controller: existingQuestions", existingQuestions);

    const newQuestionWords = question.toLowerCase().split(" ");

    // console.log("Controller: newQuestionWords", newQuestionWords);



    // Find similar questions based on word count match
    const similarQuestions = [];
    for (const existingQuestion of existingQuestions) {
        const existingQuestionWords = existingQuestion.question.toLowerCase().split(" ");
        const matchCount = newQuestionWords.filter(word => existingQuestionWords.includes(word)).length;
        const similarityThreshold = Math.floor(newQuestionWords.length * 0.8);  // Adjust threshold (0.7 = 70% match)
        if (matchCount >= similarityThreshold) {
            similarQuestions.push(existingQuestion);
        }
    }

    // console.log("Controller: similarQuestions", similarQuestions);
    return similarQuestions;
}



// findSimilarQuestion("Tarih", " bir çok çalkantılı mücadele- Jer gerekse farklı nedenlerden kaynaklı isyanlar bu çalkan- tıli dönemlerin olmazsa olmazlarıdır. ilk sırada Yeniçeri Ocağı'nın neden oldukları yer alır. Aşağıdaki hangi padişah döneminde ulufelerin zama- rTunda ödenememesi gibi bir nedenle bir isyan çıkmış olamaz? A) Orhan Bey  D) Fatih Sulttan Mehmet E) Kanuni Sultan Süleyman");
module.exports = { findSimilarQuestion };
