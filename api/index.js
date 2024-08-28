const app = require('express')();
const cors = require('cors');
const express = require('express')
const {insert} = require('./mongo-crud')

//adding the cross origin access 
const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type']
};

// Use CORS middleware with options
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send("server is running....");
});

app.use(express.json())
app.post('/insert', async (req, res) => {
  
    try {
      const { name,price,quantity } = req.body;
      await insert({ name,price,quantity });
      res.status(200).send({ message: 'Document inserted successfully' });
    } catch (err) {
      console.error('Failed to insert document:', err);
  
      // Only send a response if one hasn't been sent yet
      if (!res.headersSent) {
        res.status(500).send({error:"Failed to insert the document"});
        // res.status(500).send({ error: 'Failed to insert document' });
      }
    }
  });
app.listen(3000,()=>{
console.log("Server is running on localhost:3000")
})

module.exports = app;