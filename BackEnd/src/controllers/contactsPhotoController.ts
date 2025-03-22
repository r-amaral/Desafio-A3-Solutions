import contacts from "../models/Contact";
import { Request, Response } from "express";
import { isValidBase64 } from "../utils/validate";

class ContactsPhotoController {
  static getContactPhoto = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const id = req.params.id;

      const contactPhoto = await contacts.findByIdAndDelete(id);

      if (!contactPhoto?.havePhoto) {
        res
          .status(400)
          .json({ message: "Contact without existing photo" });
        return;
      }

      res.status(200).json(contactPhoto.photo);
    } catch (erro) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static includePhoto = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { photo } = req.body;

      const id = req.params.id;

      if (!photo || !isValidBase64(photo)) {
        res.status(400).json({ message: "Invalid base64" });
        return;
      }

      await contacts.findByIdAndUpdate(id, {
        $set: { ...req.body, havePhoto: true },
      });

      res.status(202).send({ message: "Contact photo included" });
    } catch (erro) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static deleteContactPhoto = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const contactResult = await contacts.findById(id);

      if (!contactResult) {
        res.status(404).json({ message: "Contact not found" });
        return;
      }

      contactResult.photo = "";
      contactResult.havePhoto = false;

      await contactResult.save();

      res
        .status(202)
        .send({ message: "Contact photo removed successfully" });
    } catch (erro) {
      res.status(500).send({ message: "Internal server error" });
    }
  };
}

export default ContactsPhotoController;
