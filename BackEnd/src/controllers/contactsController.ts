import contacts from "../models/Contact";
import { Request, Response } from "express";
import { Document } from "mongoose";

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

      const contactsByConditions = await contacts.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { cpf: { $regex: query, $options: "i" } },
          { phone: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
        ],
      });

      res.status(200).json(contactsByConditions);
    } catch (erro: any) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default ContactsController;
