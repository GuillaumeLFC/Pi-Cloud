import { Router, Request, Response } from 'express';
import { importPhoto } from '../controller/import_photos';
import { uploadsPhotos } from '../middleware/multer/photos';
import multer from 'multer';

const router = Router();

//Middlewares
const multerUploadPhoto = uploadsPhotos.array('photos');

// Error handling middleware for Multer
const handleMulterError = (err, req, res, next) => {
  console.log('handlemulter error appelé')
  if (err instanceof multer.MulterError) {
    // Multer-specific error occurred (e.g., file size exceeded)
    console.log(err.message);
  } else {
    // Other generic errors occurred during file upload
    console.log(err.message);
  }
};

router.get('/',async (req : Request, res : Response) => {
    res.send("Serveur en ligne !)");
  });

router.post('/', multerUploadPhoto, handleMulterError, (req,res) => {
  if (req.files) {
    importPhoto(req,res);
  } else {
    res.send('Aie ça a pas marché !!')
  }
});


router.use(handleMulterError);

export default router