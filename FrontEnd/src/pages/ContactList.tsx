import React, { useState } from "react";
import "./contactList.css";
import Card from "../components/Card";
import Input from "../components/Input";
import Alert from "../components/Alert";
import Header from "../components/Header";
import { initialList } from "./constants";
import { ContactTypes } from "../types";

const ContactList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [list, setList] = useState(initialList);

  const filteredList = list.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.cpf.toLowerCase().includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm) ||
      item.phone.toLowerCase().includes(searchTerm)
  );

  const onMountList = () => {
    if (filteredList.length <= 0) {
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
        {filteredList.map((item: ContactTypes, i: number) => (
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
              onChange={(event) =>
                setSearchTerm(event.target.value.toLowerCase())
              }
            />
          </div>
          {onMountList()}
        </div>
      </section>
    </main>
  );
};

export default ContactList;
