import React from "react";
import classNames from "classnames";

const Input = ({ type = "text", name, value, onChange, placeholder, className }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={classNames(
        "w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
        className
      )}
    />
  );
};

export default Input;