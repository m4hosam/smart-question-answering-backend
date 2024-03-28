const { createQuestionDB } = require('../Model/questionModel');
const axios = require('axios'); // Make sure to install axios if not already done
const FormData = require('form-data');


module.exports = {
    createQuestionFromImage: async (req, res) => {
        try {
            // get user_id from auth middleware
            const user_id = req.user.id;
            console.log("Q U Controller: user_id", user_id);
            const { image } = req.body;
            // console.log("Q U Controller: Image", image);

            // call the OCR_CLASSIFICATION_API to get question and category from image
            // Prepare form data
            let formData = new FormData();
            formData.append('image', image);

            // call the OCR_CLASSIFICATION_API to get question and category from image
            const response = await axios.post(process.env.OCR_CLASSIFICATION_API, formData, {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                },
            });
            if (response.status !== 200) {
                return res.status(400).send("Error in extracting question and category from image");
            }

            const { question, category } = response.data;
            if (!question || !category) {
                return res.status(400).send("Error in extracting question and category from image");
            }
            const new_question = await createQuestionDB(user_id, question, category);
            if (!new_question) {
                return res.status(400).send("Error in creating question");
            }
            return res.status(200).json(new_question);
        }
        catch (err) {
            return res.status(500).send(err);
        }
    }
}
