import { ContactTypes } from "../../../types";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import "./contact-modal.css";
import { patchContactList, postContactList } from "../../../services";
import { useState } from "react";
import Loading from "../../../components/Loading";

interface ContactModalTypes {
  open: boolean;
  setOpenModal: (open: boolean) => void;
  isEdit?: boolean;
  contactData: ContactTypes;
  setContactData(e: ContactTypes): void;
  setModalLoading(e: boolean): void;
  modalLoading: boolean;
  searchList(): void;
}

const ContactModal = ({
  open,
  setOpenModal,
  isEdit,
  contactData,
  setContactData,
  setModalLoading,
  modalLoading,
  searchList,
}: ContactModalTypes) => {
  const [alert, setAlert] = useState({ text: "", type: "" });

  const onCloseModal = () => {
    setOpenModal(false);
    setContactData({
      name: "",
      cpf: "",
      email: "",
      phone: "",
      id: "",
    });
    setAlert({ text: "", type: "" });
  };

  const onCreateOrEditContact = () => {
    const payload = {
      setLoading: setModalLoading,
      name: contactData.name,
      cpf: contactData.cpf,
      email: contactData.email,
      phone: contactData.phone,
    };

    if (isEdit) {
      if (
        contactData.name ||
        contactData.cpf ||
        contactData.email ||
        contactData.phone
      ) {
        patchContactList({
          ...payload,
          id: contactData.id as string,
        })
          .then((response) => {
            setAlert({ type: "Success", text: response.message });
            searchList();
          })
          .catch((error) => {
            setAlert({ type: "Error", text: error.message });
          });
      }
    } else {
      postContactList(payload)
        .then(() => {
          searchList();
          onCloseModal();
        })
        .catch((error) => {
          setAlert({ type: "Error", text: error.message });
        });
    }
  };
  return (
    <Modal open={open} onClose={onCloseModal}>
      <div className="Contact__Modal_Wrapper">
        <div className="Contact__Modal_Header">
          <h2 className="Contact__Modal_Title">
            {isEdit ? "Edit Contact" : "Add new contact"}
          </h2>
        </div>
        <Input
          id="input-name"
          label="Name"
          placeholder="Enter contact name"
          value={contactData.name}
          onChange={(event) =>
            setContactData({
              ...contactData,
              name: event.target.value,
            })
          }
        />
        <Input
          id="input-email"
          label="Email"
          placeholder="Enter contact email"
          value={contactData.email}
          onChange={(event) =>
            setContactData({
              ...contactData,
              email: event.target.value,
            })
          }
        />
        <Input
          id="input-cpf"
          label="CPF"
          placeholder="Enter contact cpf"
          value={contactData.cpf}
          onChange={(event) =>
            setContactData({
              ...contactData,
              cpf: event.target.value,
            })
          }
        />
        <Input
          id="input-phone"
          label="Phone"
          placeholder="Enter contact phone"
          value={contactData.phone}
          onChange={(event) =>
            setContactData({
              ...contactData,
              phone: event.target.value,
            })
          }
        />
        {alert.text && (
          <span className={alert.type}>{alert.text}</span>
        )}
        <Loading isLoading={modalLoading} fixed />
        <div className="ContactModal__Buttons__Wrapper">
          <Button onClick={onCloseModal}>Cancel</Button>
          <Button onClick={() => onCreateOrEditContact()}>
            {isEdit ? "Edit" : "Create"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ContactModal;
