// backend/routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { analyzeMedicalImage } = require('../controllers/aiController');

// `multer` is middleware to handle 'multipart/form-data', which is used for file uploads.
// `upload.single('image')` tells multer to look for a single file in the form-data
// under the field name 'image'. It makes the file available at `req.file`.
const upload = multer();

// Defines the POST endpoint for image analysis.
router.post('/analyze-image', upload.single('image'), analyzeMedicalImage);

module.exports = router;