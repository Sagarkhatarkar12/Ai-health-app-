// backend/controllers/aiController.js
const axios = require('axios'); // Used to make HTTP requests
const FormData = require('form-data'); // Used to construct a 'multipart/form-data' request for the Python service

// The URL where your Python FastAPI service is running.
// You should store this in a .env file in a real project.
const PYTHON_ML_SERVICE_URL = 'http://localhost:8000/predict';

/**
 * Controller function to handle AI image analysis requests.
 * It receives the image from the frontend, forwards it to the Python service,
 * and then sends the result back to the frontend.
 */
const analyzeMedicalImage = async (req, res) => {
    // 1. Check if an image file was uploaded
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No image file uploaded.' });
    }

    // 2. Prepare the image data to be sent to the Python service
    const formData = new FormData();
    // Append the image buffer. The third parameter is the filename.
    formData.append('file', req.file.buffer, req.file.originalname);

    try {
        // 3. Send a POST request to the Python service with the image
        const pythonResponse = await axios.post(PYTHON_ML_SERVICE_URL, formData, {
            headers: {
                // It's crucial to set the headers correctly for multipart uploads.
                ...formData.getHeaders(),
            },
            // These options prevent errors with large file uploads.
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        });

        // 4. If successful, send the result from the Python service back to the frontend.
        res.json({
            success: true,
            data: pythonResponse.data // Assumes Python returns { "predicted_label": "...", "confidence": ... }
        });

    } catch (error) {
        // 5. Handle any errors during the process
        console.error('Error communicating with Python AI service:', error.message);
        res.status(500).json({
            success: false,
            message: 'AI analysis failed. Please ensure the Python service is running.'
        });
    }
};

module.exports = { analyzeMedicalImage };