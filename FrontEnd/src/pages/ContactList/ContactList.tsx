import { useState, useEffect } from "react";
import "./contactList.css";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Alert from "../../components/Alert";
import Header from "../../components/Header";
import { ContactTypes } from "../../types";
import Pagination from "../../components/Pagination";
import ContactModal from "./ContactModal";
import { getContactList } from "../../services";
import Button from "../../components/Button";
import Loading from "../../components/Loading";

const ContactList = () => {
  const [list, setList] = useState<ContactTypes[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [contactData, setContactData] = useState<ContactTypes>({
    name: "",
    cpf: "",
    email: "",
    phone: "",
  });

  const indexOfLastItem = currentPage * 10;
  const indexOfFirstItem = indexOfLastItem - 10;

  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const onMountList = () => {
    if (loading) {
      return <Loading isLoading={loading} />;
    }

    if (currentItems.length <= 0) {
      const alertText =
        list.length > 0 ? "No results found" : "No contacts found";

      return <Alert text={alertText} />;
    }

    return (
      <ul className="List__Content">
        <li className="List__Content__Item">
          <span>Email</span>
          <span>Name</span>
          <span>CPF</span>
          <span>Phone</span>
        </li>
        {currentItems.map((item: ContactTypes, i: number) => (
          <Card
            key={i.toString()}
            setOpenModal={setOpenModal}
            setContactData={setContactData}
            cpf={item.cpf}
            name={item.name}
            email={item.email}
            phone={item.phone}
            id={item._id}
            setLoading={setLoading}
            searchList={searchList}
          />
        ))}
      </ul>
    );
  };

  const searchList = (params: string = "") => {
    getContactList({ setList, params, setLoading });
  };

  useEffect(() => searchList(), []);

  return (
    <main>
      <Header
        activeContacts={list.length}
        openModal={() => setOpenModal(true)}
      />
      <section className="Main__Content">
        <div className="ContactList__Section">
          <div className="ContactList__Content">
            <div className="ContactList__ActionsWrapper">
              <Input
                id="input-search-contact"
                label="Search Contact"
                placeholder="search by name, email, cpf and phone"
                onChange={(event) => {
                  setCurrentPage(1);
                  setSearchTerm(event.target.value);
                }}
              />
              <Button onClick={() => searchList(searchTerm)}>
                Search
              </Button>
            </div>
            {onMountList()}
          </div>
          <Pagination
            itemsPerPage={10}
            totalItems={list.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
        <ContactModal
          open={openModal}
          setOpenModal={setOpenModal}
          contactData={contactData}
          setContactData={setContactData}
          isEdit={!!contactData._id}
          setModalLoading={setModalLoading}
          modalLoading={modalLoading}
          searchList={searchList}
        />
      </section>
    </main>
  );
};

export default ContactList;
