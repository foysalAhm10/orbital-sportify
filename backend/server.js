import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT || 5001

app.get("/", (req, res) => {
  res.send("Up and running");
});

console.log("my port:", process.env.PORT);

app.listen(PORT, () => {
  console.log("Server is up and running on PORT:", PORT);
});
