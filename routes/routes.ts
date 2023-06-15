import { Router, Request, Response } from 'express';
import { importPhoto } from '../controller/import_photos';
import { uploadsPhotos } from '../middleware/multer/photos';
import multer from 'multer';
const router = Router();

router.get('/',async (req : Request, res : Response) => {
    res.send("Serveur en ligne :)");
  });

router.post('/',uploadsPhotos.array('photos'), (req,res) => {
  if (req.files) {
    res.send('req.files présent');
    importPhoto(req,res);
  } else {
    res.send('req.file non présent')
  }
});

// Error handling middleware for Multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific error occurred (e.g., file size exceeded)
    console.log(err.message);
  } else {
    // Other generic errors occurred during file upload
    console.log(err.message);
  }
};
router.use(handleMulterError);

export default router