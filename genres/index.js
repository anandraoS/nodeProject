const mongoose = require('mongoose');
const express = require('express');
const genres = require('./genres');
const app = express();

mongoose.connect('mongodb://localhost/deadly')
.then(()=> console.log('connected to mongo db'))
.catch(err=> console.error('not connnected',err));
app.use(express.json());
app.use('/api/genres',genres);

const port = process.env.PORT ||3000;
app.listen(port, ()=>{
    console.log('listening at port ', port);
})
