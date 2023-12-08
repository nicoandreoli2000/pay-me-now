import express from "express";
import cors from "cors";
import { db } from "./db";

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

app.get("/payments", async (req, res) => {
  const data = await db();
  res.send(data);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
