import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import classes from "./Form.module.css";

import {
  postTransaction,
  updateTransaction,
  setIsAddButtonClick,
  loadTransactions,
  setIsButtonShow,
  selectUpdatingTransactionState,
  isEditing,
  setIsEditing,
  deleteTransaction
} from "../../../../reducers/transactions/transactions-slice";
import {selectFilteredCategories} from "../../../../reducers/categories/categories-slice";
import {selectFilteredAccounts} from "../../../../reducers/accounts/accounts-slice";
import {selectUserId} from "../../../../reducers/user/user-slice";

import Input from "../../../common/components/Input/Input";
import Select from "../../../common/components/Select/Select";
import Button from "../../../common/components/Button/Button";

import {validateForm, updateFormControls, createFormControls} from "./utils";

function TransactionCreateForm(){
  const userId = useSelector(selectUserId);
  const getCategories = useSelector(selectFilteredCategories);
  const getAccounts = useSelector(selectFilteredAccounts);
  const categories = [...getCategories];
  const accounts = [...getAccounts];
  const getUpdatingTransaction = useSelector(selectUpdatingTransactionState);
  const getIsEditing = useSelector(isEditing);
  const dispatch = useDispatch();

  const initialDate = new Date().toISOString().slice(0, -14);
  let formTransaction = {};

  if (getIsEditing) {
      formTransaction = {
        id: getUpdatingTransaction.id,
        sum: getUpdatingTransaction.sum,
        date: getUpdatingTransaction.date,
        expense: getUpdatingTransaction.expense,
        showInBalance: getUpdatingTransaction.showInBalance,
        category: getUpdatingTransaction.category,
        account: getUpdatingTransaction.account,
        categoryId: getUpdatingTransaction.categoryId,
        accountId: getUpdatingTransaction.accountId,
      };
  } else {
      formTransaction = {
        id:"",
        sum: "",
        date: initialDate,
        expense: true,
        showInBalance: true
      };
  }

  let initialState = {
      isFormValid: false,
      formControls: updateFormControls("date", initialDate, createFormControls()),
      formTransaction
    };

  const [state, setState] = useState(initialState);

  const isEqual = JSON.stringify(state.formTransaction) === JSON.stringify(getUpdatingTransaction);

  let {id, sum, date, expense, category, account} = state.formTransaction;

  const setUserInput = (name, value) => {
    if (name === "expense") {
      value = !state.formTransaction.expense;
    }
    if (name === "sum") {
      value = +value === 0 ? "" : +value;
    }
    return {
      ...state.formTransaction,
      [name]: value
    };
  };

  const setUserSelect = (selector, value) => {
    let name = "";
    let id = "";
    let category = "";
    let account = "";
    let userSelect = {};

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
      account = value;
      userSelect = {
        [name]: id,
        account,
      };
    }

    if (selector === "category") {
      name = "categoryId";
      id = getId(categories, value);
      category = value;
      userSelect = {
        [name]: id,
        category,
      };
    }

    return {
      ...state.formTransaction,
      ...userSelect
    };
  };

  const onChangeUserInput = (value, name) => {
    const formControls = updateFormControls(name, value, state.formControls);

    setState({
      formControls,
      isFormValid: validateForm(formControls),
      formTransaction: setUserInput(name, value)
    });
  };

  const onChangeSelectHandler = (selector) => (e) => {
    const value = e.target.value;
    const formControls = updateFormControls(selector, value, state.formControls);

    setState({
      formControls,
      isFormValid: validateForm(formControls),
      formTransaction: setUserSelect(selector, value)
    });
  };

  const updateTransactionHandler = () => {
    dispatch(updateTransaction({...state.formTransaction}));
    dispatch(loadTransactions(userId));
    dispatch(setIsAddButtonClick());
    dispatch(setIsButtonShow(true));
    dispatch(setIsEditing(false));
  };

  const deleteTransactionHandler = () => {
    const confirm = window.confirm("Are you sure?");

    if (confirm) {
      dispatch(deleteTransaction(id));
      dispatch(loadTransactions(userId));
      dispatch(setIsAddButtonClick());
      dispatch(setIsButtonShow(true));
      dispatch(setIsEditing(false));
    }
  };

  const onClickSubmitButton = (e) => {
    e.preventDefault();
  };

  const addTransactionHandler = () => {
    dispatch(postTransaction({...state.formTransaction, userId}));
    dispatch(loadTransactions(userId));
    dispatch(setIsAddButtonClick());
    dispatch(setIsButtonShow(true));
    dispatch(setIsEditing(false));

    setState(initialState);
  };

  const nodeRef = React.useRef(null);

  return (
    <section className={classes.form} >
      <div className={classes.dialogWrapper}>
        <form onSubmit={onClickSubmitButton}>
          <div className={classes.dialog} ref={nodeRef}>

            {getIsEditing
              ? <>
                  <Button
                    type="submit"
                    onClick={updateTransactionHandler}
                    disabled={isEqual}
                  >
                    Update
                  </Button>

                  <Button
                    type="submit"
                    onClick={deleteTransactionHandler}
                    disabled={!isEqual}
                  >
                    Delete
                  </Button>
                </>
              : null}

            {!getIsEditing
              ? <Button
                  type="submit"
                  onClick={addTransactionHandler}
                  disabled={!state.isFormValid}
                >
                  Create
                </Button>
              : null}

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
              value={category}
              valid={state.formControls.category.valid}
              shouldValidate={!!state.formControls.category.validation}
              touched={state.formControls.category.touched}
              errorMessage={state.formControls.category.errorMessage}
            />

            <Select
              options={accounts}
              defaultOption="Choose an account"
              onChange={onChangeSelectHandler("account")}
              value={account}
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
                checked={!expense}
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
