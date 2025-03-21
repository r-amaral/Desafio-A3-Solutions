import express from "express";
import contacts from "./contactsRoutes";

const routes = (app: any) => {
  app.use(express.json(), contacts);
};

export default routes;
