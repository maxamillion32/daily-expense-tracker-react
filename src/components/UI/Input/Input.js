import React from 'react';
import classes from './Input.module.css';

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}

const Input = (props) => {
  const inputType = props.type || 'text';
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  inputType === "checkbox" ? cls.push(classes.InputTypeCheckbox) : cls.push(classes.InputType)

  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }

  return (
    <div className={cls.join(' ')}>
      <input
        type={inputType}
        name={props.name}
        placeholder={props.placeholder}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />
      <label htmlFor={htmlFor}>{props.label}</label>

      {
        isInvalid(props)
        ? <span>{props.errorMessage || "Enter correct value"}</span>
        : null
      }
    </div>
  )
}

export default Input;
