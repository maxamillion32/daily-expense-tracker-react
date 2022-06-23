import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import classes from "./Form.module.css";

import {
  postTransaction, updateTransaction,
  loadTransactions, selectUpdatingTransactionState,
  selectIsEditing, setIsEditing, deleteTransaction,
  selectIsExpense, selectIsTransfer
} from "../../../../reducers/transactions/transactions-slice";
import {setIsButtonShow, setIsTransactionTypeClick} from "../../../../reducers/navigation/navigation-slice";
import {selectFilteredCategories} from "../../../../reducers/categories/categories-slice";
import {selectFilteredAccounts} from "../../../../reducers/accounts/accounts-slice";
import {selectUserId} from "../../../../reducers/user/user-slice";

import Input from "../../../common/components/Input/Input";
import Select from "../../../common/components/Select/Select";
import Button from "../../../common/components/Button/Button";

import {validateForm, updateFormControls, createFormControls} from "./utils/utils";
import {isEqual} from "../../../common/utils/utils";

const filteredCategories = (categories, type, isEditing) => {
  return isEditing
    ? categories
    : categories.filter((category) => type ? !category.incomes : category.incomes);
};

const FormContainer = ({children, onSubmit, nodeRef}) => (
  <section className={classes.form} >
      <div className={classes.formWrapper}>
        <form onSubmit={onSubmit}>
          <div className={classes.formContainer} ref={nodeRef}>
            {children}
          </div>
        </form>
      </div>
    </section>
);

// const FormContainer = ({getIsEditing}) => {
//   return (getIsEditing ? <>
//                           <Button
//                             title="Update"
//                             onClick={updateTransactionHandler}
//                             disabled={isFormStateEqual}
//                           />
//
//                           <Button
//                             title="Delete"
//                             onClick={deleteTransactionHandler}
//                             disabled={!isFormStateEqual}
//                           />
//                         </>
//                       : <Button
//                         title="Create"
//                         onClick={addTransactionHandler}
//                         disabled={!state.isFormValid}
//                         />
//   );
// };

function TransactionCreateForm() {
  const userId = useSelector(selectUserId);
  const getCategories = useSelector(selectFilteredCategories);
  const getAccounts = useSelector(selectFilteredAccounts);
  const getIsExpense = useSelector(selectIsExpense);
  const getIsTransfer = useSelector(selectIsTransfer);
  const categories = [...getCategories];
  const accounts = [...getAccounts];
  const getUpdatingTransaction = useSelector(selectUpdatingTransactionState);
  const getIsEditing = useSelector(selectIsEditing);
  const dispatch = useDispatch();

  const initialDate = new Date().toISOString().slice(0, -14);
  let formTransaction = {};

  if (getIsEditing) {
    formTransaction = {...getUpdatingTransaction};
  } else {
    formTransaction = {
      id: "",
      sum: "",
      date: initialDate,
      expense: getIsExpense,
      showInBalance: true
    };
  }

  let initialState = {
    isFormValid: false,
    formControls: updateFormControls("date", initialDate, createFormControls()),
    formTransaction
  };

  const [state, setState] = useState(initialState);
  let {id, sum, date, expense, category, account} = state.formTransaction;

  const isFormStateEqual = isEqual(state.formTransaction, getUpdatingTransaction);

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
    dispatch(setIsTransactionTypeClick());
    dispatch(setIsButtonShow(true));
    dispatch(setIsEditing(false));
  };

  const deleteTransactionHandler = () => {
    const confirm = window.confirm("Are you sure?");

    if (confirm) {
      dispatch(deleteTransaction(id));
      dispatch(loadTransactions(userId));
      dispatch(setIsTransactionTypeClick());
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
    dispatch(setIsTransactionTypeClick());
    dispatch(setIsButtonShow(true));
    dispatch(setIsEditing(false));

    setState(initialState);
  };

  const nodeRef = React.useRef(null);

  return (
    <FormContainer
      onSubmit={onClickSubmitButton}
      nodeRef={nodeRef}
    >

      {getIsEditing ? <>
                        <Button
                          title="Update"
                          onClick={updateTransactionHandler}
                          disabled={isFormStateEqual}
                        />

                        <Button
                          title="Delete"
                          onClick={deleteTransactionHandler}
                          disabled={!isFormStateEqual}
                        />
                      </>
                    : <Button
                        title="Create"
                        onClick={addTransactionHandler}
                        disabled={!state.isFormValid}
                      />}

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
        checked={null}
        isDisabled={false}
        label={null}
      />

      {!getIsTransfer ? <Select
                          options={filteredCategories(categories, getIsExpense, getIsEditing)}
                          defaultOption="Choose a category"
                          onChange={onChangeSelectHandler("category")}
                          value={category}
                          valid={state.formControls.category.valid}
                          shouldValidate={!!state.formControls.category.validation}
                          touched={state.formControls.category.touched}
                          errorMessage={state.formControls.category.errorMessage}
                          label={null}
                          />
                      : <Select
                          options={accounts}
                          defaultOption="Choose an account"
                          onChange={onChangeSelectHandler("account")}
                          value={account}
                          valid={state.formControls.account.valid}
                          shouldValidate={!!state.formControls.account.validation}
                          touched={state.formControls.account.touched}
                          errorMessage={state.formControls.account.errorMessage}
                          label={null}/>}

      <Select
        options={accounts}
        defaultOption="Choose an account"
        onChange={onChangeSelectHandler("account")}
        value={account}
        valid={state.formControls.account.valid}
        shouldValidate={!!state.formControls.account.validation}
        touched={state.formControls.account.touched}
        errorMessage={state.formControls.account.errorMessage}
        label={null}/>

      <Input
        type="date"
        name="date"
        value={date}
        valid={state.formControls.date.valid}
        shouldValidate={!!state.formControls.date.validation}
        touched={state.formControls.date.touched}
        errorMessage={state.formControls.date.errorMessage}
        onChange={(event) => onChangeUserInput(event.target.value, event.target.name)}
        checked={null}
        isDisabled={false}
        label={null}
        placeholder={null}/>

      {getIsEditing ? <div className={classes.inputTypeWrapper}>
                        <Input
                          label={"Income"}
                          type="checkbox"
                          name="expense"
                          checked={!expense}
                          onChange={(event) => onChangeUserInput(event.target.value, event.target.name)}
                          errorMessage={null}
                          isDisabled={false}
                          placeholder={null}
                          shouldValidate={null}
                          touched={null}
                          valid={null}
                          value={""}/>
                      </div>
                    : null}
    </FormContainer>
  );
}

export default TransactionCreateForm;
