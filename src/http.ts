import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "*");
  res.set("Access-Control-Allow-Methods", "*");
  next();
});

app.get("/", (req, res) =>
  res.status(200).json({ hello: "Server is up time" })
);

app.post("/auth", async (req, res) => {
  return res.status(200).json({});
});

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['*']
  }
});

export { httpServer, io };
