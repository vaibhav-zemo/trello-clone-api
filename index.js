const express = require('express');
const app = express()
const cors = require('cors');
require('dotenv').config();
require('./config/mongoose');
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get('/api/check', (req, res) => {
    return res.status(200).send('Server is running!');
})

app.listen(PORT, ()=>{
    console.log('Server is running on port: ', PORT);
})