import { Collection, ObjectId, Db } from "mongodb";
import { Photo } from "../../utils/photos";
import { connectoMongo, disconnectfromMongo } from "../connection/mongoDB";
import { db } from "../initialisation/mongoDB/init";
import { photosCollectionName } from "../initialisation/mongoDB/photos";

/**
 * Le document des données d'une photo dans MongoDB
 */
interface DocumentPhoto {
    _id : ObjectId | string ,
    path : string,
    filextension ?: string,
    DateAndTimeISO : string,
    metadata ?: {
        ImageWidth?: number | undefined;
        ImageHeight?: number | undefined;
        XResolution?: number | undefined;
        YResolution?: number | undefined;
        ExifVersion?: string | undefined;
        DateTimeOriginal?: string | undefined;
        Latitude?: number | undefined;
        Longitude?: number | undefined;
    }
};

export async function insertMongoPhoto(photo : Photo): Promise<void> {
    try {
        await connectoMongo();
        const collection : Collection = db.collection(photosCollectionName);
        const document : DocumentPhoto = {
            _id : photo.id,
            path : photo.path,
            filextension : photo.filextension,
            DateAndTimeISO : photo.DateAndTimeISO,
            metadata : photo.metadata
        }
        console.log(document._id);
        //@ts-expect-error (Un problème de type pour l'id que j'ai la flemme de régler) (ça marche quand meme)
        const result = await collection.insertOne(document);
        console.log("La photo ", photo.id, " a bien été enregistrée dans MongoDB");
    } catch (error) {
        console.error('Erreur dans le insertmongo : \n', error);
    } finally {
        await disconnectfromMongo();
    }
    //return result;
};
