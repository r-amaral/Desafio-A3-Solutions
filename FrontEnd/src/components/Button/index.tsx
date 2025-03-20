import React from "react";
import "./button.css";

type ButtonTypes = React.ComponentProps<"button"> & {
  children: React.ReactNode;
};

const Button = ({ children, ...rest }: ButtonTypes) => {
  return (
    <button className="Button__Content" {...rest}>
      {children}
    </button>
  );
};

export default Button;
