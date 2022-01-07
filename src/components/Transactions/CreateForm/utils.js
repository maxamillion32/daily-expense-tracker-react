function createControl(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: ""
  };
}

function validate(value, validation = null) {
  if (!validation) {
    return true;
  }

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== "" && isValid;
  }

  return isValid;
}


export function validateForm(formControls) {
  let isFormValid = true;

  for (let control in formControls) {
    if (Object.prototype.hasOwnProperty.call(formControls, control)) {
      isFormValid = formControls[control].valid && isFormValid;
    }
  }

  return isFormValid;
}

export function updateFormControls(name, value, state) {
  const formControls = {...state};
  const control = {...formControls[name]};

  control.touched = true;
  control.value = value;
  control.valid = validate(control.value, control.validation);

  formControls[name] = control;

  return formControls;
}

export function createFormControls() {
  return {
    sum: createControl({
      errorMessage: "Please fill out this field"
    }, {required: true}),
    date: createControl({
      errorMessage: "Choose a date please",
    }, {required: true}),
    category: createControl({
      errorMessage: "Choose a category please",
    }, {required: true}),
    account: createControl({
      errorMessage: "Choose an account please",
    }, {required: true}),
  };
}
