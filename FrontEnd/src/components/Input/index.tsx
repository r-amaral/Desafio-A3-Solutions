import React from "react";
import "./input.css";

type InputProps = React.ComponentProps<"input"> & {
  id: string;
  label: string;
  placeholder: string;
  error?: boolean;
};

const Input: React.FC<InputProps> = ({
  id,
  label,
  placeholder,
  error = false,
  ...rest
}) => {
  return (
    <div className="Input__Container">
      <label className="Input__Label" htmlFor={id}>
        {label}
      </label>
      <input
        className={`Input__Field ${error ? "Input__Error" : ""}`}
        id={id}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default Input;
