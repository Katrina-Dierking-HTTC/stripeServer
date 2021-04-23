const express = require ('express');
const cors = require('cors');

require('dotenv').config({path: './env'});

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors({origin: true}));
//cors needed to react app can send requests to server

app.get('/', (req, res) => res.send('It\'s a hot day here in NC'));

app.listen(port, () => console.log('Shhhh! Someone is listening on port', port));

