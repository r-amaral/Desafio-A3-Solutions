import express from "express";
import contacts from "./contactsRoutes";
import { authenticate } from "../middlewares/authenticate";

const routes = (app: any) => {
  app.use(authenticate);
  app.use(express.json(), contacts);
};

export default routes;
