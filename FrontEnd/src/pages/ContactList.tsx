import React, { useState } from "react";
import Button from "../components/Button";
import "./contactList.css";
import Card from "../components/Card";
import Input from "../components/Input";
import Alert from "../components/Alert";

const initialList = [
  { name: "ruan", cpf: "cpf", email: "email", phone: "phone" },
];

const ContactList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [list, setList] = useState(initialList);

  const filteredList = list.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.cpf.toLowerCase().includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm)
  );

  const onMountList = () => {
    if (filteredList.length <= 0) {
      return (
        <Alert text="Nenhum contato cadastrado ou sem resultados de busca" />
      );
    }

    return (
      <ul className="List__Content">
        {filteredList.map(
          (
            item: {
              name: string;
              cpf: string;
              email: string;
              phone: string;
            },
            i: number
          ) => (
            <Card
              key={i.toString()}
              cpf={item.cpf}
              name={item.name}
              email={item.email}
              phone={item.phone}
            />
          )
        )}
      </ul>
    );
  };

  return (
    <main className="Main__Content">
      <section className="ContactList__Section">
        <div className="ContactList__ActionsWrapper">
          <Input
            id="input-search-contact"
            label="Search Contact"
            placeholder="Search Contact"
            onChange={(event) =>
              setSearchTerm(event.target.value.toLowerCase())
            }
          />
          <Button>Add contact</Button>
        </div>

        {onMountList()}
      </section>
    </main>
  );
};

export default ContactList;
