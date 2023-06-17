
import { Photo } from "../utils/photos";
import { Request, Response } from 'express';

export async function importPhoto(req : Request , res : Response) {
  try {
    const photos = []
    for (const file of req.files){
      const photo = new Photo(false, file.name, file.path);
      handlemetadata(photo);
      photo.filextension = getextension(file.filename); 
    };
    res.send('Photos uploadées');
  } catch (error) {
    console.log(error);
    res.send(error);
  };
  
};

async function handlemetadata (photo,) {
    const metadata = await photo.extractmetadata(photo.path);
    photo.savemetadata(metadata);  
};

function getextension (filename) {
    if (filename.includes('.jpg')) {
      return 'jpg'
    } //à developper...
  };
