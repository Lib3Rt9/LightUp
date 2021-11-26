// console.log("WebSocket!");

// dependencies
const express = require('express');
const webSocket = require('ws');
const socketServer = require('ws').Server;

const server = express().listen(3000);

const wss = new socketServer({server});

wss.on('connection', (ws) => {
    console.log('{Server} A client was connected.');

    ws.on('close', () => {console.log('{Server} Client disconnected.') });

    ws.on('message', (message) => {
        console.log('{Server} Received message: ' + message);

        // send
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === webSocket.OPEN) {
                client.send(message);
            }
        })
    })
})