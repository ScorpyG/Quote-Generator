const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());

mongoose.connect(uri, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
);
mongoose.connection.once('open', () => {
    console.log("MongoDB database connection established successfully!");
});

const quoteRouter = require('./routes/quotes');
app.use('/quotes', quoteRouter);

app.listen(port, (error) => {
    if (error) {
        console.log(`Error detected: ${error}`);
    }
    console.log(`Server is running on port: ${port}`);
}); 