const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

// Configure multer storage
const storage = multer.memoryStorage();

// Configure multer file filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only images.'));
    }
};

// Configure multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Create uploads directory if it doesn't exist
const UPLOADS_DIR = path.join(__dirname, '../uploads');
fs.mkdir(UPLOADS_DIR, { recursive: true })
    .catch(err => console.error('Error creating uploads directory:', err));

// Middleware to process uploaded image
const processImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return next();
        }

        // Generate unique filename
        const uniqueSuffix = uuidv4();
        const extension = path.extname(req.file.originalname);
        const filename = `${uniqueSuffix}${extension}`;
        const imagePath = path.join(UPLOADS_DIR, filename);

        // Process image with sharp
        await sharp(req.file.buffer)
            .resize(800, 600, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .toFile(imagePath);

        // Store the processed image path in req
        req.processedImage = {
            filename,
            path: imagePath,
            originalName: req.file.originalname
        };

        next();
    } catch (err) {
        // Clean up if there was an error
        if (req.file) {
            try {
                await fs.unlink(req.file.path);
            } catch (cleanupErr) {
                console.error('Error cleaning up file:', cleanupErr);
            }
        }
        next(err);
    }
};

module.exports = {
    upload,
    processImage,
    // Single image upload middleware
    singleUpload: upload.single('image'),
    // Multiple image upload middleware
    multipleUpload: upload.array('images', 5) // Limit to 5 images
};
