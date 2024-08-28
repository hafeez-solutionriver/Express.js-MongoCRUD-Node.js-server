const app = require('express')();
const cors = require('cors');
const express = require('express');
const { insert, getAll, deleteByName, updateByName } = require('./mongo-crud');

// Adding the cross-origin access
const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type']
};

// Use CORS middleware with options
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
    res.send("Server is running....");
});

// Insert a new document
app.use(express.json());
app.post('/insert', async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        await insert({ name, price, quantity });
        res.status(200).send({ message: 'Document inserted successfully' });
    } catch (err) {
        console.error('Failed to insert document:', err);
        if (!res.headersSent) {
            res.status(500).send({ error: "Failed to insert the document" });
        }
    }
});

// Get all records
app.use(express.json());
app.get('/records', async (req, res) => {
    try {
        const records = await getAll();
        res.status(200).send(records);
    } catch (err) {
        console.error('Failed to retrieve records:', err);
        res.status(500).send({ error: "Failed to retrieve records" });
    }
});


//To make it simple, I'm using the POST method for both delete and update

// Delete a record by name (using POST)
app.use(express.json());
app.post('/delete', async (req, res) => {
    try {
        const { name } = req.body;
        await deleteByName(name);
        res.status(200).send({ message: 'Document deleted successfully' });
    } catch (err) {
        console.error('Failed to delete document:', err);
        res.status(500).send({ error: "Failed to delete the document" });
    }
});

// Update a record by name (using POST)
app.use(express.json());
app.post('/update', async (req, res) => {
    try {
        const { name, newData } = req.body;
        await updateByName(name, newData);
        res.status(200).send({ message: 'Document updated successfully' });
    } catch (err) {
        console.error('Failed to update document:', err);
        res.status(500).send({ error: "Failed to update the document" });
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on localhost:3000");
});

module.exports = app;
