import { Router, Request, Response } from 'express';
import { importPhoto } from '../controller/import_photos';

const router = Router();

router.get('/',async (req : Request, res : Response) => {
    res.send("Serveur en ligne !");
  });

router.post('/', importPhoto, (req,res) => {
});

export default router