
const express = require('express');
const app = require('./index.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

const PORT = process.env.PORT || 3000

const dbURI = process.env.MONGO_URI

mongoose.connect(dbURI, {useNewUrlParser:true, useUnifiedTopology:true})
.then(result => {
    app.listen(PORT);
    console.log("connected to db");
    console.log("running on port: "+PORT);

})
.catch((err) => console.log(err));

