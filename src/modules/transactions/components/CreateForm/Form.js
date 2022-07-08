import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
// import classes from "./Form.module.css";
import {
  deleteTransaction,
  loadTransactions,
  postTransaction,
  selectIsEditing,
  selectIsExpense,
  selectIsTransfer,
  selectUpdatingTransactionState,
  setIsEditing, setIsTransfer,
  updateTransaction
} from "../../../../reducers/transactions/transactions-slice";
import {setIsButtonShow, setIsTransactionTypeClick} from "../../../../reducers/navigation/navigation-slice";
import {findTransferCategory, selectFilteredCategories} from "../../../../reducers/categories/categories-slice";
import {selectFilteredAccounts} from "../../../../reducers/accounts/accounts-slice";
import {selectUserId} from "../../../../reducers/user/user-slice";

import Input from "../../../common/components/Input/Input";
import Select from "../../../common/components/Select/Select";
import FormContainer from "./Container/Container";
import FormButtons from "./Buttons/Buttons";

import {
  createFormControls,
  createFormTransferControls,
  filteredCategories,
  updateFormControls,
  validateForm
} from "./utils/utils";
import {isEqual} from "../../../common/utils/utils";

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
  const transferCategory = useSelector(findTransferCategory);
  const dispatch = useDispatch();

  const initialDate = new Date().toISOString().slice(0, -14);

  const getInitState = () => {
    if (getIsEditing) {
      return getUpdatingTransaction;
    } else {
      return {
        formControls: getIsTransfer
          ? updateFormControls("date", initialDate, createFormTransferControls())
          : updateFormControls("date", initialDate, createFormControls()),
        formTransaction: {
          id: "",
          sum: "",
          date: initialDate,
          expense: getIsExpense,
          showInBalance: true,
          transfer: getIsTransfer,
          accountIdFrom: "",
          accountIdTo: "",
          transferId: new Date().toISOString(),
          accountFrom: "",
          accountTo: ""
        },
        isFormValid: false,
      };
    }
  };

  let initialState = getInitState();

  const [state, setState] = useState(initialState);

  let {id, sum, date, category, account,
       transfer, expense, showInBalance,
       accountIdFrom, accountFrom,
       accountIdTo, accountTo, transferId,
       categoryId, accountId} = state.formTransaction;

  const isFormStateEqual = isEqual(state, getUpdatingTransaction);

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
    let userSelect;

    const getIdOfSelected = (data, target) => {
      let idItem;
      data.map((item) => {
        if (item.title === target) {
          idItem = item.id;
        }
        return idItem;
      });
      return idItem;
    };

    const getUserSelect = (itemId, itemValue, id) => {
      return {
        [itemId]: id,
        [itemValue]: value,
      };
    };

    if (selector === "account") {
      const selectorID = "accountId";
      id = getIdOfSelected(accounts, value);
      userSelect = getUserSelect(selectorID, selector, id);
    }

    if (selector === "accountFrom") {
      const selectorID = "accountIdFrom";
      id = getIdOfSelected(accounts, value);
      userSelect = getUserSelect(selectorID, selector, id);
    }

    if (selector === "accountTo") {
      const selectorID = "accountIdTo";
      id = getIdOfSelected(accounts, value);
      userSelect = getUserSelect(selectorID, selector, id);
    }

    if (selector === "category") {
      const selectorID = "categoryId";
      id = getIdOfSelected(categories, value);
      userSelect = getUserSelect(selectorID, selector, id);
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
    let formControls = updateFormControls(selector, value, state.formControls);

      setState({
        formControls,
        isFormValid: validateForm(formControls),
        formTransaction: setUserSelect(selector, value)
      });
  };

  const updateTransactionHandler = async () => {
    if (transfer) {
      await dispatch(updateTransaction({...state.formTransaction, transferId}));
    } else {
      await dispatch(updateTransaction({...state.formTransaction}));
    }

    dispatch(loadTransactions(userId));
    dispatch(setIsTransactionTypeClick());
    dispatch(setIsButtonShow(true));
    dispatch(setIsEditing(false));
    dispatch(setIsTransfer(false));
  };

  const deleteTransactionHandler = async () => {
    const confirm = window.confirm("Are you sure?");

    if (confirm) {
      if (transfer) {
        await dispatch(deleteTransaction({id, transferId}));
      } else {
        await dispatch(deleteTransaction({id}));
      }

      dispatch(loadTransactions(userId));
      dispatch(setIsTransactionTypeClick());
      dispatch(setIsButtonShow(true));
      dispatch(setIsEditing(false));
      dispatch(setIsTransfer(false));
    }
  };

  const onClickSubmitButton = (e) => {
    e.preventDefault();
  };

  const addTransactionHandler = () => {
    if (transfer) {
      dispatch(postTransaction(
        {
          sum, expense, date, userId, transfer, transferId,
          categoryId: transferCategory.id,
          accountId: accountIdFrom,
          showInBalance: false
        }));
      dispatch(postTransaction(
        {
          sum, date, userId, transfer, transferId,
          expense: false,
          categoryId: transferCategory.id,
          accountId: accountIdTo,
          showInBalance: false
        }));
      dispatch(postTransaction(
        {
          sum, date, showInBalance, userId, transfer, accountFrom,
          accountTo, accountIdFrom, accountIdTo, transferId,
          expense: null,
          categoryId: transferCategory.id,
          accountId: accountIdTo
        }));
    } else {
      dispatch(postTransaction({categoryId, accountId, date, sum, expense, showInBalance, userId}));
    }
    dispatch(loadTransactions(userId));
    dispatch(setIsTransactionTypeClick());
    dispatch(setIsButtonShow(true));
    dispatch(setIsEditing(false));
    dispatch(setIsTransfer(false));

    setState(initialState);
  };

  const nodeRef = React.useRef(null);

  return (
    <FormContainer
      onSubmit={onClickSubmitButton}
      nodeRef={nodeRef}
    >

      <FormButtons
        getIsEditing={getIsEditing}
        update={updateTransactionHandler}
        remove={deleteTransactionHandler}
        create={addTransactionHandler}
        isStateEqual={isFormStateEqual}
        state={state}
      />

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

      {transfer ? <>
                      <Select
                        options={accounts}
                        defaultOption="Choose an account"
                        onChange={onChangeSelectHandler("accountFrom")}
                        value={accountFrom}
                        valid={state.formControls.accountFrom.valid}
                        shouldValidate={!!state.formControls.accountFrom.validation}
                        touched={state.formControls.accountFrom.touched}
                        errorMessage={state.formControls.accountFrom.errorMessage}
                        label={null}
                      />
                      <Select
                        options={accounts}
                        defaultOption="Choose an account"
                        onChange={onChangeSelectHandler("accountTo")}
                        value={accountTo}
                        valid={state.formControls.accountTo.valid}
                        shouldValidate={!!state.formControls.accountTo.validation}
                        touched={state.formControls.accountTo.touched}
                        errorMessage={state.formControls.accountTo.errorMessage}
                        label={null}
                      />
                    </>
                  : <>
                      <Select
                        options={filteredCategories(categories, getIsExpense, getIsEditing)}
                        defaultOption="Choose a category"
                        onChange={onChangeSelectHandler("category")}
                        value={category}
                        valid={state.formControls.category.valid}
                        shouldValidate={!!state.formControls.category.validation}
                        touched={state.formControls.category.touched}
                        errorMessage={state.formControls.category.errorMessage}
                        label={null}/>
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
                    </>
      }

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
    </FormContainer>
  );
}

export default TransactionCreateForm;
