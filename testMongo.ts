import { MongoClient,ServerApiVersion } from "mongodb";

// Replace the placeholder with your Atlas connection string
const uri = "mongodb://localhost";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
        family : 4,
    }
);

export async function connectoMongo() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    console.log('On tente le connect');
    await client.connect();
    // Send a ping to confirm a successful connection
    console.log('Connect passé, on envoie un ping');
    console.log(await client.db("admin").command({ ping: 1 }));
    console.log("Connexion à mongoDB réussie !");
  } catch(error) {
    console.error(error);
    throw error;
  }
}

export async function disconnectMongo () {
  await client.close();
  console.log('Déconnexion de MongoDB réussie ')
}

async function main (){
    try {
        await connectoMongo();
    } catch(error){
        console.dir(error);
    } finally {
        await disconnectMongo();
    }
};
main();