const express = require('express')
const app = express()
const http = require('http')
const { Server } = require("socket.io")

const cors = require("cors")
const { log } = require('console')
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    const id = socket.id;
    console.log(`A user connected: ${id}`);

    socket.on('send_message', (data) => {
        socket.emit('reci_message', { message: data.message });
    })
    socket.on('disconnect', () => {
        console.log(`A user disconnected: ${socket.id}`)
    })
})
const port = 3000

server.listen(port, () => console.log(`App listening on port ${port}!`))