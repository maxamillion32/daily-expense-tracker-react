import React from "react";
import classes from "./Select.module.css";

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched;
}

const Select = ({defaultOption, options, onChange, errorMessage, valid, touched, shouldValidate}) => {
  // const value = props.options.length !== 0 && props.options[2].title;
  const cls = [classes.Select];

  return (
    <div className={cls}>
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
};

export default Select;
