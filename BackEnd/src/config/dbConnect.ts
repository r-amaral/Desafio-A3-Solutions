import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://admin:1234@contactlistcluster.r8piu.mongodb.net/ContactList"
);

let db = mongoose.connection;

export default db;
