import React from "react";
import "./card.css";
import Popover from "../Popover";
import { ContactTypes } from "../../types";

interface CardTypes {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  id?: string;
  setOpenModal(open: boolean): void;
  setContactData(e: ContactTypes): void;
}

const Card = ({
  name,
  cpf,
  email,
  phone,
  id,
  setOpenModal,
  setContactData,
}: CardTypes) => {
  const [open, setOpen] = React.useState(false);

  const handleEdit = () => {
    setOpenModal(true);
    setOpen(false);
    setContactData({ name, cpf, email, phone, id });
  };

  return (
    <li className="List__Content__Item Card">
      <span>{email}</span>
      <span>{name}</span>
      <span>{cpf}</span>
      <span>{phone}</span>
      <div className="List_Item__Action__Wrapper">
        <button
          className="List__Item__Action"
          onClick={() => setOpen(!open)}
        >
          ...
        </button>
        <Popover open={open} setOpen={setOpen}>
          <div className="Popover__Container">
            <button onClick={handleEdit}>Edit</button>
            <button>Delete</button>
          </div>
        </Popover>
      </div>
    </li>
  );
};

export default Card;
