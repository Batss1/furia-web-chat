const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('Novo usuário conectado:', socket.id);

    socket.on('message', (message) => {
        if (message.text.startsWith('/')) {
            io.emit('message', {
                text: 'Comando recebido: ${message.text}', 
                isBot: true,
            });
        }
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectado:', socket.id);
    });
});

httpServer.listen(3001, () => {
    console.log('Backend Socket.io rodando na porta 3001');
});