const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const sessionService = require('../services/sessionService');
const messageController = require('../controllers/messageController');

module.exports = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        const sessionId = uuidv4();
        ws.sessionId = sessionId;

        sessionService.addSession(sessionId, ws);

        ws.on('message', (data) => {
            messageController.handleMessage(ws, data);
        });

        ws.on('close', () => {
            sessionService.removeSession(sessionId);
            messageController.handleDisconnect(ws);
        });
    });
};
