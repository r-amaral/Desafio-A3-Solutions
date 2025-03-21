import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  cpf: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  havePhoto: { type: Boolean, default: false },
});

const contacts = mongoose.model("Contacts", contactSchema);

export default contacts;
