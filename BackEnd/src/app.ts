import express from "express";
import db from "./config/dbConnect";

db.on("error", console.log.bind(console, "Connection error"));
db.once("open", () => {
  console.log("database connection made successfully");
});

const app = express();
app.use(express.json());

export default app;
