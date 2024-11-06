import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { Documents } from '../models/document.js';
import { generateDynamicUrl } from '../utils/urlGenerator.js';
import { sendWhatsAppNotification } from '../services/whatsappService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.get('/', (req, res) => {
  res.render('index', { language: 'en' });
});

router.post('/upload', upload.fields([
  { name: 'sitePhotos', maxCount: 10 },
  { name: 'surveyReports', maxCount: 10 }
]), async (req, res) => {
  try {
    const sitePhotos = req.files['sitePhotos'].map(file => file.path);
    const surveyReports = req.files['surveyReports'].map(file => file.path);

    const newDocument = new Documents({
      sitePhotoPaths: sitePhotos,
      surveyReportPaths: surveyReports,
    });

    await newDocument.save();

    const dynamicUrl = generateDynamicUrl();
    await sendWhatsAppNotification('+1234567890', `New files uploaded. View here: ${dynamicUrl}`);

    res.render('upload-result', { success: true, url: dynamicUrl });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.render('upload-result', { success: false, error: error.message });
  }
});

export default router;