import React from "react";

const FSInput = ({ type, name, value, placeholder, onChange, className }) => {
  return (
    <div className={`${className}"w-full py-3 px-5"`}>
      <div className="flex">
        <div className="w-2/5 flex items-center">
          <label className="mr-16 capitalize" htmlFor={name}>
            {name}
          </label>
        </div>
        <div className={`"w-full"`}>
          <input
            className="px-5 py-3 w-full rounded-xl border-2 border-solid"
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FSInput;
