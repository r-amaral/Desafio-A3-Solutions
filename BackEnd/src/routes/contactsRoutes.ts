import express from "express";
import ContactsController from "../controllers/contactsController";
import ContactsPhotoController from "../controllers/contactsPhotoController";

const router = express.Router();

router.get("/contact/search", ContactsController.listContacts);
router.get("/contact/:id", ContactsController.listContactsById);
router.post("/contact", ContactsController.createContact);
router.patch("/contact/:id", ContactsController.updateContact);
router.delete("/contact/:id", ContactsController.deleteContact);
router.get(
  "/contact/:id/photo",
  ContactsPhotoController.getContactPhoto
);
router.patch(
  "/contact/:id/photo",
  ContactsPhotoController.includePhoto
);
router.delete(
  "/contact/:id/photo",
  ContactsPhotoController.deleteContactPhoto
);

export default router;
