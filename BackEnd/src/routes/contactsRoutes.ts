import express from "express";
import ContactsController from "../controllers/contactsController";

const router = express.Router();

router.get("/contact/search", ContactsController.listContacts);
router.post("/contact", ContactsController.createContact);

export default router;
