import express from "express";
import ContactsController from "../controllers/contactsController";

const router = express.Router();

router.get("/contact/search", ContactsController.listContacts);
router.get("/contact/:id", ContactsController.listContactsById);
router.post("/contact", ContactsController.createContact);
router.patch("/contact/:id", ContactsController.updateContact);
router.delete("/contact/:id", ContactsController.deleteContact);

export default router;
