import React from "react";
import "./card.css";

interface CardTypes {
  name: string;
  cpf: string;
  email: string;
  phone: string;
}

const Card = ({ name, cpf, email, phone }: CardTypes) => (
  <li className="List__Content__Item Card">
    <span>{email}</span>
    <span>{name}</span>
    <span>{cpf}</span>
    <span>{phone}</span>
    <button className="List__Item__Action">...</button>
  </li>
);

export default Card;
