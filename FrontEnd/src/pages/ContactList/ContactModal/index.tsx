import { ContactTypes } from "../../../types";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import "./contact-modal.css";

interface ContactModalTypes {
  open: boolean;
  setOpenModal: (open: boolean) => void;
  isEdit?: boolean;
  contactData: ContactTypes;
  setContactData(e: ContactTypes): void;
}

const ContactModal = ({
  open,
  setOpenModal,
  isEdit,
  contactData,
  setContactData,
}: ContactModalTypes) => {
  const onCloseModal = () => {
    setOpenModal(false);
    setContactData({
      name: "",
      cpf: "",
      email: "",
      phone: "",
      id: "",
    });
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
        <div className="ContactModal__Buttons__Wrapper">
          <Button onClick={onCloseModal}>Cancel</Button>
          <Button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            {isEdit ? "Edit" : "Create"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ContactModal;
