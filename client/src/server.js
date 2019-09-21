const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 5000;
require('dotenv').config();
// link to the database String
const uri = require("../../config/keys").mongoURI;


const main_router = express.Router();


let create_user = require('../../models/user.model.js');

app.use(cors());
app.use(express.json());



mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

const contactsRouter = require('../../routes/contacts');
const userRouter = require('../../routes/users');

app.use('/contacts', contactsRouter);
app.use('/users', userRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
