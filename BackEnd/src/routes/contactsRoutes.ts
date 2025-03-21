import express from "express";
import ContactsController from "../controllers/contactsController";

const router = express.Router();

router.get("/contacts", ContactsController.listContacts);

export default router;
