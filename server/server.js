const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const url = require('url');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });

let messages = [];

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

app.get('/api/whatsapp/chat/:clientId', (req, res) => {
    const clientId = req.params.clientId;
    const newMessages = messages.filter(msg => msg.client_id === clientId);
    res.json({ data: newMessages });
});

app.post('/api/whatsapp/sendMessages', (req, res) => {
    const message = {
        id: Date.now(),
        ...req.body,
        create_dates: {
            created_at_human: "Just now",
            created_at: new Date().toISOString()
        }
    };
    messages.push(message);
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN && client.clientId === req.body.client_id) {
            client.send(JSON.stringify(message));
        }
    });
    res.status(201).json({ data: message });
});

wss.on('connection', (ws, req) => {
    const queryParams = url.parse(req.url, true).query;
    ws.clientId = queryParams.clientId;
    console.log('Client connected to WebSocket server');
    ws.on('close', () => console.log('Client disconnected from WebSocket server'));
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

server.listen(5000, () => {
    console.log('Server is listening on port 5000');
});
