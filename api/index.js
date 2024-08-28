const app = require('express')();
const cors = require('cors');


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

module.exports = app;