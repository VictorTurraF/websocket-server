import express from "express";
import http from "http";
import { Server } from "socket.io";
import { UserService } from "./services/users_service";
import jwt from "jsonwebtoken";

const userService = new UserService();

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
  const { username, password } = req.body;

  const foundUser = userService.findByNickName(username);

  if (!foundUser) {
    return res.status(400).json({ message: "Usuário ou senha inválidos" });
  }

  if (foundUser.password !== password) {
    return res.status(400).json({ message: "Usuário ou senha inválidos" });
  }

  var token = jwt.sign({ nickname: foundUser.nickname }, "mysecret", {
    subject: String(foundUser.id),
  });

  return res.status(200).json({ token, user: foundUser });
});

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["*"],
  },
});

export { httpServer, io };
