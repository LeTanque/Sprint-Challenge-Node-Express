const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./data/router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());



server.get('/', (req, res) => {
    res.send(`
        <h2>Lambda Projects and Actions</h2>
    `);
});



server.use('/api', router);



module.exports = server;
