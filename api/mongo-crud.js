const { MongoClient, ServerApiVersion } = require('mongodb');

let client;
//For the security purpose, URI is palced in env file
//Mongo Atlas would provide the URI when creating the database over there.
async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(process.env.URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    await client.connect();
    console.log("Connected to MongoDB!");
  }
  return client;
}

async function insert(document) {
  try {
    const client = await connectToDatabase();
    const database = client.db('APIS-Testing');
    const collection = database.collection('Product');
    const result = await collection.insertOne(document);
    console.log(`Inserted document with id: ${result.insertedId}`);
  } catch (err) {
    console.error('Failed to insert document:', err);
  }
}

//closing the client connection when your app is shutting down
process.on('SIGINT', async () => {
  if (client) {
    await client.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
  }
});

// Exporting the CRUD method to be used elsewhere
module.exports = {
  insert
};
