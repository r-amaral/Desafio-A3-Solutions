import React from "react";
import "./card.css";
import Popover from "../Popover";
import { ContactTypes } from "../../types";
import { deleteContact } from "../../services";
import Modal from "../Modal";
import Button from "../Button";

interface CardTypes {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  id?: string;
  setOpenModal(open: boolean): void;
  setContactData(e: ContactTypes): void;
  setLoading(e: boolean): void;
  searchList(): void;
}

const Card = ({
  name,
  cpf,
  email,
  phone,
  id,
  setOpenModal,
  setContactData,
  setLoading,
  searchList,
}: CardTypes) => {
  const [open, setOpen] = React.useState(false);
  const [openConfirmModal, setOpenConfirmModal] =
    React.useState(false);

  const handleEdit = () => {
    setOpenModal(true);
    setOpen(false);
    setContactData({ name, cpf, email, phone, _id: id });
  };

  const onDeleteContact = () => {
    deleteContact({ id: id as string, setLoading })
      .then(searchList)
      .catch(console.error);
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
            <button
              onClick={() => {
                setOpen(false);
                setOpenConfirmModal(true);
              }}
            >
              Delete
            </button>
          </div>
        </Popover>
        <Modal
          open={openConfirmModal}
          onClose={() => setOpenConfirmModal(false)}
        >
          <div className="Confirm__Modal_Header">
            <h2 className="Confirm__Modal_Title">
              Are you sure you want to delete the contact?
            </h2>
          </div>
          <div className="Confirm__Buttons__Wrapper">
            <Button onClick={() => setOpenConfirmModal(false)}>
              Cancel
            </Button>
            <Button onClick={onDeleteContact}>Confirm</Button>
          </div>
        </Modal>
      </div>
    </li>
  );
};

export default Card;
