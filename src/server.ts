import express from "express";

const app = express();

app.use(express.json());
app.get("/", (req, res) =>
  res.status(200).json({ hello: "Server is up time" })
);

app.listen(3333, () => console.log("Server running on port 3333"));
