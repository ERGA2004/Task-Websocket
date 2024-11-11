const express = require('express');
const http = require('http');
const websocketServer = require('./websocket/server');
const config = require('config');

const app = express();
const server = http.createServer(app);
const PORT = config.get('server.port');

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.get('/', (req, res) => {
    res.send('WebSocket Server is running');
});

websocketServer(server);
