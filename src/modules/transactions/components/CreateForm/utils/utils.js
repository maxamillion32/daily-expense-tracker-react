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
    isValid = value && value.trim() !== "" && isValid;
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

  if (formControls.accountFrom) {
    if (formControls["accountFrom"].value === value) {
      control.valid = false;
    } else {
      const control = {...formControls["accountFrom"]};
      control.valid = validate(control.value, control.validation);
      formControls["accountFrom"] = control;
    }
    if (formControls["accountTo"].value === value) {
      control.valid = false;
    } else {
      const control = {...formControls["accountTo"]};
      control.valid = validate(control.value, control.validation);
      formControls["accountTo"] = control;
    }
  }

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

export function createFormTransferControls() {
  return {
    sum: createControl({
      errorMessage: "Please fill out this field"
    }, {required: true}),
    date: createControl({
      errorMessage: "Choose a date please",
    }, {required: true}),
    accountFrom: createControl({
      errorMessage: "Please choose another account",
    }, {required: true}),
    accountTo: createControl({
      errorMessage: "Please choose another account",
    }, {required: true}),
  };
}

// interface isInvalidProps {
//   valid: boolean,
//   touched: boolean,
//   shouldValidate: boolean,
// }

export function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched;
}

export const filteredCategories = (categories, type, isEditing) => {
  return isEditing
    ? categories
    : categories.filter((category) => type ? !category.incomes : category.incomes);
};
