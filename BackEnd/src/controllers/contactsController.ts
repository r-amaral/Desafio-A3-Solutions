import contacts from "../models/Contact";
import { Request, Response } from "express";
import { Document } from "mongoose";
import {
  validateEmail,
  validateName,
  validatePhone,
  validateCpf,
} from "../utils";

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
    } catch (erro: any) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static createContact = async (req: Request, res: Response) => {
    try {
      const { name, cpf, phone, email } = req.body;

      if (validateName(name)) {
        return res
          .status(400)
          .send({ message: "Invalid name format" });
      }

      if (validateEmail(email)) {
        return res
          .status(400)
          .send({ message: "Invalid email format" });
      }

      if (validatePhone(phone)) {
        return res
          .status(400)
          .send({ message: "Invalid phone number format" });
      }

      if (validateCpf(cpf)) {
        return res
          .status(400)
          .send({ message: "Invalid cpf format" });
      }

      const contact = new contacts(req.body);

      const contactResults = await contact.save();

      res.status(201).send({
        message: "Contact created successfully",
        contact: contactResults,
      });
    } catch (erro: any) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default ContactsController;
