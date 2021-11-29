import React from 'react';
import classes from './Select.module.css'

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}

const Select = (props) => {
  // const value = props.options.length !== 0 && props.options[2].title;
  const cls = [classes.Select];

  return (
    <div className={cls}>
      <select
        // value={value}
        onChange={props.onChange}
      >
        <option value="" hidden>{props.defaultOption}</option>
        {props.options.map((option) => {
          return (
            <option
              value={option.title}
              key={option.id}
            >
              {option.title}
            </option>
          )
        })}
        {
        isInvalid(props)
        ? <span>{props.errorMessage || "Enter correct value"}</span>
        : null
      }
      </select>
    </div>
  );
}

export default Select;
