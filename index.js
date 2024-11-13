const express = require('express')
const app = express()
const http = require('http')
const { Server } = require("socket.io")
require('dotenv').config()
const cors = require("cors")
const { log } = require('console')
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URI,
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    const id = socket.id;
    console.log(`A user connected: ${id}`);

    socket.on('send_message', (data) => {
        socket.broadcast.emit('reci_message', { message: data.message });

    })
    socket.on('disconnect', () => {
        console.log(`A user disconnected: ${socket.id}`)
    })
})
const port = 3000

server.listen(port, () => console.log(`App listening on port ${port}!`))