import contacts from "../models/Contact";
import { Request, Response } from "express";
import { Document } from "mongoose";
import { validateFields } from "../utils/validate";
interface Contact extends Document {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  havePhoto: boolean;
}

class ContactsController {
  static listContacts = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { query } = req.query;

      let newQuery = {};

      if (query) {
        newQuery = {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { cpf: { $regex: query, $options: "i" } },
            { phone: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
          ],
        };
      }

      const contactResults = await contacts.find(newQuery);

      res.status(200).json(contactResults);
    } catch (erro) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static createContact = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { name, cpf, phone, email } = req.body;

      const validation = validateFields({
        name,
        cpf,
        phone,
        email,
        isCreate: true,
      });

      if (!validation.valid) {
        res.status(400).json({ message: validation.message });
        return;
      }

      const contact = new contacts(req.body);

      const contactResults = await contact.save();

      res.status(201).send({
        message: "Contact created successfully",
        contact: contactResults,
      });
    } catch (erro) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static updateContact = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const id = req.params.id;

      const { name, cpf, phone, email } = req.body;

      const validation = validateFields({
        name,
        cpf,
        phone,
        email,
      });

      if (!validation.valid) {
        res.status(400).json({ message: validation.message });
        return;
      }

      await contacts.findByIdAndUpdate(id, { $set: req.body });

      res
        .status(200)
        .send({ message: "contact updated successfully" });
    } catch (erro) {
      res.status(500).send({ message: (erro as Error).message });
    }
  };
}

export default ContactsController;
