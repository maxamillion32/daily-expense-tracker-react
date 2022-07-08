import React from "react";
import classes from "./Select.module.css";
import {isInvalid} from "../../../transactions/components/CreateForm/utils/utils";

interface SelectProps {
  defaultOption: string,
  options: {id: string, title: string}[],
  onChange: () => void,
  label: string,
  errorMessage: string,
  value: string,
  valid: boolean,
  touched: boolean,
  shouldValidate: boolean,
}

function Select ({defaultOption, options, onChange, errorMessage, valid, touched, shouldValidate, value}: SelectProps) {
  const cls = [classes.Select];

  return (
    <div className={cls.join(" ")}>
      <select
        value={value ? value : ""}
        onChange={onChange}
      >
        <option value="" hidden>{value ? value : defaultOption}</option>
        {options.map((option) => {
          return (
            <option
              value={option.title}
              key={option.id}
            >
              {option.title}
            </option>
          );
        })}
      </select>
      {
        isInvalid({valid, touched, shouldValidate})
        ? <span>{errorMessage || "Enter correct value"}</span>
        : null
      }
    </div>
  );
}

export default Select;
