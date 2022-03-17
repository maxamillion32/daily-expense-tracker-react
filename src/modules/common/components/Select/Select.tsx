import React from "react";
import classes from "./Select.module.css";
import {isInvalid} from "../CreateForm/utils";

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

function Select ({defaultOption, options, onChange, errorMessage, valid, touched, shouldValidate}: SelectProps) {
  // const value = props.options.length !== 0 && props.options[2].title;
  const cls = [classes.Select];

  return (
    <div className={cls.join(" ")}>
      <select
        // value={value}
        onChange={onChange}
      >
        <option value="" hidden>{defaultOption}</option>
        {options.sort((a, b) => b.title.toLowerCase() > a.title.toLowerCase() ? -1 : 1).map((option) => {
          return (
            <option
              value={option.title}
              key={option.id}
            >
              {option.title}
            </option>
          );
        })}
        {
        isInvalid({valid, touched, shouldValidate})
        ? <span>{errorMessage || "Enter correct value"}</span>
        : null
      }
      </select>
    </div>
  );
}

export default Select;
