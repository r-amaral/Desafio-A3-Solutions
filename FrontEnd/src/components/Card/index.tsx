import React from "react";
import "./card.css";

interface CardTypes {
  name: string;
  cpf: string;
  email: string;
  phone: string;
}

const Card = ({ name, cpf, email, phone }: CardTypes) => (
  <li className="Card">
    <div className="Card__Content">
      <span className="Card__Title">{name}</span>
      <span className="Card__Cpf">{cpf}</span>
    </div>
    <div className="Card__Email">
      <span>{email}</span>
    </div>
    <div className="Card__Phone">
      <span>{phone}</span>
    </div>
  </li>
);

export default Card;
