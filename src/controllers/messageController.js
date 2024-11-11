const sessionService = require('../services/sessionService');

exports.handleMessage = (ws, data) => {
    const message = JSON.parse(data);

    switch (message.type) {
        case 'JOIN':
            sessionService.setUsername(ws.sessionId, message.username);
            sessionService.broadcast({ type: 'INFO', content: `${message.username} joined` });
            break;

        case 'CHAT':
            sessionService.broadcast({ type: 'CHAT', content: `${ws.username}: ${message.content}` });
            break;

        case 'COMMAND':
            handleCommand(ws, message.content);
            break;

        default:
            ws.send(JSON.stringify({ type: 'ERROR', content: 'Unknown message type' }));
    }
};

function handleCommand(ws, command) {
    if (command === 'listUsers') {
        ws.send(JSON.stringify({ type: 'COMMAND_RESPONSE', content: sessionService.getActiveUsers() }));
    } else if (command === 'disconnect') {
        ws.close();
    } else {
        ws.send(JSON.stringify({ type: 'ERROR', content: 'Unknown command' }));
    }
}

exports.handleDisconnect = (ws) => {
    sessionService.broadcast({ type: 'INFO', content: `${ws.username} left` });
};
