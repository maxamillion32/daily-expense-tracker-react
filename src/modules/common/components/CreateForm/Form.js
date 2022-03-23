import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import classes from "./Form.module.css";

import {
  postTransaction,
  setIsAddButtonClick,
  loadTransactions,
  setIsButtonShow
} from "../../../../reducers/transactions/transactions-slice";
import {selectAllCategoriesState} from "../../../../reducers/categories/categories-slice";
import {selectAllAccountsState} from "../../../../reducers/accounts/accounts-slice";
import {selectUserId} from "../../../../reducers/user/user-slice";

import Input from "../../../common/components/Input/Input";
import Select from "../../../common/components/Select/Select";
import Button from "../../../common/components/Button/Button";

import {validateForm, updateFormControls, createFormControls} from "./utils";

function TransactionCreateForm(){
  const userId = useSelector(selectUserId);
  const getCategories = useSelector(selectAllCategoriesState);
  const getAccounts = useSelector(selectAllAccountsState);
  const categories = [...getCategories];
  const accounts = [...getAccounts];
  const dispatch = useDispatch();

  const initialDate = new Date().toISOString().slice(0, -14);

  const initialState = {
    isFormValid: false,
    formControls: updateFormControls("date", initialDate, createFormControls()),
    newTransaction: {
      sum: "",
      date: initialDate,
      expense: true,
    }
  };

  const [state, setState] = useState(initialState);
  const {sum, date} = state.newTransaction;

  const setUserInput = (name, value) => {
    if (name === "expense") {
      value = !state.newTransaction.expense;
    }
    if (name === "sum") {
      value = +value === 0 ? "" : +value;
    }
    return {
      ...state.newTransaction,
      [name]: value
    };
  };

  const setUserSelect = (selector, value) => {
    let name = "";
    let id = "";

    const getId = (data, target) => {
      let idItem;
      data.map((item) => {
        if (item.title === target) {
          idItem = item.id;
        }
        return idItem;
      });
      return idItem;
    };

    if (selector === "account") {
      name = "accountId";
      id = getId(accounts, value);
    }

    if (selector === "category") {
      name = "categoryId";
      id = getId(categories, value);
    }

    return {
      ...state.newTransaction,
      [name]: id,
    };
  };

  const onChangeUserInput = (value, name) => {
    const formControls = updateFormControls(name, value, state.formControls);

    setState({
      formControls,
      isFormValid: validateForm(formControls),
      newTransaction: setUserInput(name, value)
    });
  };

  const onChangeSelectHandler = (selector) => (e) => {
    const value = e.target.value;
    const formControls = updateFormControls(selector, value, state.formControls);

    setState({
      formControls,
      isFormValid: validateForm(formControls),
      newTransaction: setUserSelect(selector, value)
    });
  };

  const onClickSubmitButton = (e) => {
    e.preventDefault();
  };

  const addTransactionHandler = () => {
    dispatch(postTransaction({...state.newTransaction, userId}));
    dispatch(setIsAddButtonClick());
    dispatch(loadTransactions(userId));
    dispatch(setIsButtonShow(true));

    setState(initialState);
  };

  const nodeRef = React.useRef(null);

  return (
    <section className={classes.form} >
      <div className={classes.dialogWrapper}>
        <form onSubmit={onClickSubmitButton}>
          <div className={classes.dialog} ref={nodeRef}>
            <Button
              type="submit"
              onClick={addTransactionHandler}
              disabled={!state.isFormValid}
            >
              Create
            </Button>
            <Input
              type="number"
              name="sum"
              placeholder="0.00"
              value={sum}
              valid={state.formControls.sum.valid}
              shouldValidate={!!state.formControls.sum.validation}
              touched={state.formControls.sum.touched}
              errorMessage={state.formControls.sum.errorMessage}
              onChange={(event) => onChangeUserInput(event.target.value, event.target.name)}
            />

            <Select
              options={categories}
              defaultOption="Choose a category"
              onChange={onChangeSelectHandler("category")}

              valid={state.formControls.category.valid}
              shouldValidate={!!state.formControls.category.validation}
              touched={state.formControls.category.touched}
              errorMessage={state.formControls.category.errorMessage}
            />

            <Select
              options={accounts}
              defaultOption="Choose an account"
              onChange={onChangeSelectHandler("account")}

              valid={state.formControls.account.valid}
              shouldValidate={!!state.formControls.account.validation}
              touched={state.formControls.account.touched}
              errorMessage={state.formControls.account.errorMessage}
            />

            <Input
              type="date"
              name="date"
              value={date}
              valid={state.formControls.date.valid}
              shouldValidate={!!state.formControls.date.validation}
              touched={state.formControls.date.touched}
              errorMessage={state.formControls.date.errorMessage}
              onChange={(event) => onChangeUserInput(event.target.value, event.target.name)}
            />

            <div className={classes.dialogType}>
              <Input
                label={"Income"}
                type="checkbox"
                name="expense"
                onChange={(event) => onChangeUserInput(event.target.value, event.target.name)}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default TransactionCreateForm;
