
import { Photo } from "../utils/photos";
import { Request, Response } from 'express';

export async function importPhoto(req : Request , res : Response) {
  try {
    for (const file of req.files){
      const id : string = getIDfromfilename(file.filename)
      const photo = new Photo(id, file.path);
      handlemetadata(photo);
      photo.filextension = getextension(file.filename); 
    };
    res.send('Photos uploadées');
  } catch (error) {
    console.log(error);
    res.send(error);
  };  
};

async function handlemetadata (photo : Photo) {
    const metadata = await photo.extractmetadata(photo.path);
    photo.savemetadata(metadata);  
};

function getIDfromfilename (filename :string) : string {
  const lastIndex = filename.lastIndexOf('.');
  if (lastIndex === -1) {
    return filename
  };
  return filename.slice(0, lastIndex);
};

function getextension (filename : string) : string {
    if (filename.includes('.jpg')) {
      return 'jpg'
    } //à developper
    return 'jpg'; 
  };
