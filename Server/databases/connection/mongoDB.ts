import { MongoClient,ServerApiVersion } from "mongodb";

// Replace the placeholder with your Atlas connection string
const uri = "mongodb://mongo";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const defaultClient = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
        family : 4,
    }
);

export async function connectoMongo(client ?: MongoClient) {
  if (!client){client = defaultClient}
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    //console.log("Connexion à mongoDB réussie !");
  } catch(error) {
    console.error(error);
    throw error;
  }
}

export async function disconnectfromMongo (client ?: MongoClient) {
  if (!client){client = defaultClient}
  await client.close();
  //console.log('Déconnexion de MongoDB réussie ')
}

