import express from "express";
import db from "./config/dbConnect";
import routes from "./routes/index";
import cors from "cors";

db.on("error", console.log.bind(console, "Connection error"));
db.once("open", () => {
  console.log("database connection made successfully");
});

const app = express();
app.use(express.json());
app.use(cors());
routes(app);

export default app;
