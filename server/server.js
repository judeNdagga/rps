const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const RpsGame = require('./rps-game');

const app = express();

const clientPath = require('path').resolve(__dirname, '..') + '/client'
console.log(`serving static from ${clientPath}`);

app.use(express.static(clientPath));
const server = http.createServer(app);

const io = socketio(server);


//matchmaking
let waitingPlayer = null;



io.on('connection', (sock) => {
    if(waitingPlayer){
        //start a game
        

        
        new RpsGame(waitingPlayer, sock);
        waitingPlayer = null;

    }

    else{
        waitingPlayer = sock;
        waitingPlayer.emit('message', 'waitng for opponent');
    }

    sock.on('message', (text) => {
        io.emit('message', text);
    })
});
//
server.on('error', (err) => {console.error('Server error:', err);});

server.listen(8090, () => {console.log('RPS started on 8090');});