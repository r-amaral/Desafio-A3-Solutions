import React, { useState } from "react";
import "./contactList.css";
import Card from "../components/Card";
import Input from "../components/Input";
import Alert from "../components/Alert";
import Header from "../components/Header";
import { initialList } from "./constants";
import { ContactTypes } from "../types";
import Pagination from "../components/pagination";

const ContactList = () => {
  const [list, setList] = useState(initialList);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredList = list.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.cpf.toLowerCase().includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm) ||
      item.phone.toLowerCase().includes(searchTerm)
  );

  const indexOfLastItem = currentPage * 10;
  const indexOfFirstItem = indexOfLastItem - 10;

  const currentItems = filteredList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const onMountList = () => {
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
            cpf={item.cpf}
            name={item.name}
            email={item.email}
            phone={item.phone}
          />
        ))}
      </ul>
    );
  };

  return (
    <main>
      <Header activeContacts={list.length} />
      <section className="Main__Content">
        <div className="ContactList__Section">
          <div className="ContactList__ActionsWrapper">
            <Input
              id="input-search-contact"
              label="Search Contact"
              placeholder="search by name, email, cpf and phone"
              onChange={(event) => {
                setCurrentPage(1);
                setSearchTerm(event.target.value.toLowerCase());
              }}
            />
          </div>
          {onMountList()}
          <Pagination
            itemsPerPage={10}
            totalItems={filteredList.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </section>
    </main>
  );
};

export default ContactList;
