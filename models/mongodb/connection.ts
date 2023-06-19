import { MongoClient,ServerApiVersion } from "mongodb";

// Replace the placeholder with your Atlas connection string
const uri = "mongodb://mongo";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    console.log('on try le connect');
    await client.connect();
    console.log('on a reussi la ligne 20 !!!')
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connexion à mongoDB réussie !");

  } finally {
    console.log('on est passés dans le finally')
    // Ensures that the client will close when you finish/error
    await client.close();

  }
}

export function connectoMongo(){
    run().catch(console.dir);  
}

