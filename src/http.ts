import express from "express";
import http from 'http'
import {Server} from 'socket.io'

const app = express();

app.use(express.json());
app.get("/", (req, res) =>
  res.status(200).json({ hello: "Server is up time" })
);

app.post('/auth', async (req, res) => {
  return res.status(200).json({})
})

const httpServer = http.createServer(app)
const io = new Server(httpServer)

export { httpServer, io }