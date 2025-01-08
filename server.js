const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process?.env?.PORT || 5001

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit:"2mb",extended: true }));

app.get('/', (req, res) =>{
    res.send('Welcome to the Express Server!')
})

app.listen(port,() =>{
    console.log("server listening on port", port);   
})
