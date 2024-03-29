const { createQuestionDB } = require('../Model/questionModel');
const axios = require('axios'); // Make sure to install axios if not already done
const FormData = require('form-data');
const sharp = require('sharp');

async function optimizeImageURL(dataUrl) {
    let maxWidth = 600;
    let maxKB = 50;
    // Convert the data URL to a Buffer
    let imgBuffer = Buffer.from(dataUrl.split(",")[1], 'base64');

    // Get the metadata of the image
    let metadata = await sharp(imgBuffer).metadata();

    // If the width of the image is less than 600px, keep the original size
    if (metadata.width <= 600) {
        maxWidth = metadata.width;
    }
    let maxHeight = metadata.height;

    // Resize and compress the image
    let optimizedImage = await sharp(imgBuffer)
        .resize({ width: maxWidth, height: maxHeight, fit: 'inside' })
        .webp({ quality: 80 }) // adjust the quality as needed
        .toBuffer();

    // Check the size of the optimized image
    while (optimizedImage.byteLength > maxKB * 1024) {
        // Reduce the quality by 10% each time
        optimizedImage = await sharp(optimizedImage)
            .webp({ quality: Math.max(0, sharp.metadata().quality - 10) })
            .toBuffer();
    }


    // Convert the optimized image to a data URL
    let optimizedDataUrl = 'data:image/webp;base64,' + optimizedImage.toString('base64');

    return optimizedDataUrl;
}

async function optimizeImage(imageBuffer) {
    let maxWidth = 600;
    let maxKB = 50;

    // Get the metadata of the image
    let metadata = await sharp(imageBuffer).metadata();

    // If the width of the image is less than 600px, keep the original size
    if (metadata.width <= 600) {
        maxWidth = metadata.width;
    }
    let maxHeight = metadata.height;

    // Resize and compress the image
    let optimizedImage = await sharp(imageBuffer)
        .resize({ width: maxWidth, height: maxHeight, fit: 'inside' })
        .webp({ quality: 80 }) // adjust the quality as needed
        .toBuffer();

    // Check the size of the optimized image
    while (optimizedImage.byteLength > maxKB * 1024) {
        // Reduce the quality by 10% each time
        optimizedImage = await sharp(optimizedImage)
            .webp({ quality: Math.max(0, sharp.metadata().quality - 10) })
            .toBuffer();
    }

    // Convert the optimized image to a data URL
    let optimizedDataUrl = 'data:image/webp;base64,' + optimizedImage.toString('base64');

    return optimizedDataUrl;
}



module.exports = {
    createQuestionFromImageURL: async (req, res) => {
        try {
            // get user_id from auth middleware
            const user_id = req.user.id;
            console.log("Q U Controller: user_id", user_id);
            const { image } = req.body;
            // console.log("Q U Controller: Image", image);
            // Optimize the image
            let optimizedImage = await optimizeImageURL(image);
            // call the OCR_CLASSIFICATION_API to get question and category from image
            // Prepare form data
            let formData = new FormData();
            formData.append('image', optimizedImage);

            // call the OCR_CLASSIFICATION_API to get question and category from image
            const response = await axios.post(process.env.OCR_CLASSIFICATION_API, formData, {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                },
                timeout: 70000,
            }
            );
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
    },
    createQuestionFromImageBinary: async (req, res) => {
        try {
            // get user_id from auth middleware
            const user_id = req.user.id;
            console.log("Q U Controller: user_id", user_id);

            // Optimize the image
            const optimizedImage = await optimizeImage(req.file.buffer);
            // console.log("Q U Controller: optimizedImage", optimizedImage);


            // Prepare form data
            let formData = new FormData();
            formData.append('image', optimizedImage);

            // call the OCR_CLASSIFICATION_API to get question and category from image
            const response = await axios.post(process.env.OCR_CLASSIFICATION_API, formData, {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                },
                timeout: 70000,
            }
            );
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
