const WebSocket = require('ws');
const sessions = new Map();


exports.addSession = (sessionId, ws) => {
    ws.username = `User-${sessionId.slice(0, 4)}`;
    sessions.set(sessionId, ws);
};

exports.setUsername = (sessionId, username) => {
    const session = sessions.get(sessionId);
    if (session) session.username = username;
};

exports.removeSession = (sessionId) => {
    sessions.delete(sessionId);
};

exports.broadcast = (message) => {
    sessions.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
};

exports.getActiveUsers = () => {
    return Array.from(sessions.values()).map((client) => client.username);
};
