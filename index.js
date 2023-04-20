
const express = require("express");
const {Server} = require("socket.io")
const http = require("http")
const app = express();

const server = http.createServer(app)

app.get("/", (req, res) => {
    res.send("base end point")
})
server.listen(8000, () => {
    console.log("listening on port 8000")
})
const io = new Server(server)

let count = 0
io.on("connection", (socket) => {
    count++
    io.emit("newuser", count);

    socket.on("message", (sandesh) => {
       socket.broadcast.emit("usermsg", sandesh)
    })

    socket.on("disconnect", () => {
        count--;
        io.emit("newuser", count);
    })
})