import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://admin:1234@contactlistcluster.r8piu.mongodb.net/?retryWrites=true&w=majority&appName=ContactListCluster"
);

let db = mongoose.connection;

export default db;
