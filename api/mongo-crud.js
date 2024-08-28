const { MongoClient, ServerApiVersion } = require('mongodb');

let client;

// For the security purpose, URI is placed in the env file
// Mongo Atlas would provide the URI when creating the database over there.
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

async function getAll() {
  try {
    const client = await connectToDatabase();
    const database = client.db('APIS-Testing');
    const collection = database.collection('Product');
    const documents = await collection.find({}).toArray();
    console.log('Fetched all documents:', documents);
    return documents;
  } catch (err) {
    console.error('Failed to retrieve documents:', err);
  }
}

async function deleteByName(name) {
    console.log('delete',name)
  try {
    const client = await connectToDatabase();
    const database = client.db('APIS-Testing');
    const collection = database.collection('Product');
    const result = await collection.deleteOne({ name: name });
    if (result.deletedCount > 0) {
      console.log(`Deleted document with name: ${name}`);
    } else {
      console.log(`No document found with name: ${name}`);
    }
  } catch (err) {
    console.error('Failed to delete document:', err);
  }
}

async function updateByName(name, updateData) {
  try {
    const client = await connectToDatabase();
    const database = client.db('APIS-Testing');
    const collection = database.collection('Product');
    const result = await collection.updateOne({ name: name }, { $set: updateData });
    if (result.matchedCount > 0) {
      console.log(`Updated document with name: ${name}`);
    } else {
      console.log(`No document found with name: ${name}`);
    }
  } catch (err) {
    console.error('Failed to update document:', err);
  }
}

// Closing the client connection when your app is shutting down
process.on('SIGINT', async () => {
  if (client) {
    await client.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
  }
});

// Exporting the CRUD methods to be used elsewhere
module.exports = {
  insert,
  getAll,
  deleteByName,
  updateByName
};
