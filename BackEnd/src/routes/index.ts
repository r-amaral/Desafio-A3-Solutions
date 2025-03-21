import express, { Express } from "express";
import contacts from "./contactsRoutes";
import { authenticate } from "../middlewares/authenticate";

const routes = (app: Express) => {
  app.use(authenticate);
  app.use(express.json(), contacts);
};

export default routes;
