import React from "react";
import LupaIcon from "../../assets/Lupa.tsx";
import "./Alert.css";

interface AlertTypes {
  text: string;
}

const Alert = ({ text }: AlertTypes) => {
  return (
    <div className="Alert__Wrapper">
      <LupaIcon />
      <p className="Alert__Content">{text}</p>
    </div>
  );
};

export default Alert;
