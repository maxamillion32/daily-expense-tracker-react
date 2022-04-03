import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";

import classes from "./Popup.module.css";

import {
  updateCategory, loadCategories, deleteCategory,
  postCategory, getBalanceIncomesId, getBalanceExpensesId
} from "../../../../reducers/categories/categories-slice";
import {
  currentMonth, currentYear, postTransaction,
  loadTransactions, deleteTransaction, selectAllTransactionsState
} from "../../../../reducers/transactions/transactions-slice";
import {
  deleteAccount, postAccount, updateAccount, loadAccounts
} from "../../../../reducers/accounts/accounts-slice";

import ScrollToTop from "../../../common/hooks/ScrollToTop/ScrollToTop";
import PopupIconList from "./IconList/IconList";
import Button from "../../../common/components/Button/Button";
import {formatYear, formatMonth} from "../../../common/utils/utils";
import {
  isExists, isDelete, isExpense, getTransactionsByAccountId,
  getCategoryTotalSum, getCurrentCategorySum
} from "./utils";

function SettingsPopup({itemState, prevItem, setItem, transactions, setShowPopup}) {
  const dispatch = useDispatch();
  const month = useSelector(currentMonth);
  const year = useSelector(currentYear);
  const allTransactions = useSelector(selectAllTransactionsState);
  const balanceIncomesId = useSelector(getBalanceIncomesId);
  const balanceExpensesId = useSelector(getBalanceExpensesId);
  const {id, title, userId, incomes, header, startBalance, balance, icon, hidden, date} = itemState;

  //TODO: rename prevState
  const prevState = JSON.stringify(itemState) === JSON.stringify(prevItem);
  const filteredTransactions = transactions
    .filter((transaction) => formatYear(transaction.date) === year)
    .filter((transaction) => formatMonth(transaction.date) === month);

  const [accountState, setAccountState] = useState({balance, startBalance, showInBalance: true});
  const isBalanceChange = Number(accountState.balance) !== Number(balance);
  const balanceDifference = (accountState.balance - balance).toFixed(2);

  const onChangeType = async ({target}) => {
    setItem({...itemState, incomes: target.checked});
  };

  const onClickBalanceCheck = async ({target}) => {
    setAccountState({...accountState, showInBalance: target.checked});
  };

  const onChangeItem = ({target}) => {
    const value = target.value;
    const type = incomes ? incomes : false;
    setItem({...itemState, title: value, incomes: type});
  };

  const onChangeIcon = ({target}) => {
    const value = target.value;
    setItem({...itemState, icon: value});
  };

  const onChangeStartBalance = ({target}) => {
    const value = target.value;
    setAccountState({...accountState, startBalance: value});
    setItem({...itemState, startBalance: value});
  };

  const onChangeDate = ({target}) => {
    const date = target.value;
    setItem({...itemState, date});
  };

  const onChangeBalance = ({target}) => {
    const value = target.value;
    setAccountState({...accountState, balance: value});
  };

  const onClickEditButton = () => {
    if (header === "Categories") {
      dispatch(updateCategory({id, title, userId, incomes, icon, hidden}));
      dispatch(loadCategories(userId));
    }
    if (header === "Accounts") {
      if (isBalanceChange) {
        const isIncome = balanceDifference > 0 ? false : true;
        const isShowInBalance = accountState.showInBalance;
        const balanceIncome = balanceIncomesId.id;
        const balanceExpense = balanceExpensesId.id;

        const sum = Math.abs(balanceDifference);
        const expense = isIncome;
        const balanceCategoryId = isIncome ? balanceIncome: balanceExpense;
        const showInBalance = isShowInBalance;

        dispatch(postTransaction({sum, expense, date, categoryId: balanceCategoryId, accountId: id, showInBalance, userId}));
        dispatch(loadTransactions(userId));
      }
      dispatch(updateAccount({id, title, userId, startBalance, balance: accountState.balance}));
      dispatch(loadTransactions(userId));
      dispatch(loadAccounts(userId));
    }
    setShowPopup();
  };

  function onClickDeleteButton() {
    const confirm = window.confirm("Are you sure?");

    if (confirm) {
      if (header === "Categories") {
        if (isDelete(transactions, "category", id)) {
          alert("This category is already in use and cannot be deleted!");
          return;
        }
        dispatch(deleteCategory(id));
        dispatch(loadCategories(userId));
      }

      if (header === "Accounts") {
        if (isDelete(transactions, "account", id)) {
          alert("This account is already in use and cannot be deleted!");
          return;
        }

        const transactionsByAccountId = getTransactionsByAccountId(allTransactions, id);

        if (transactionsByAccountId) {
            transactionsByAccountId.forEach((transaction) => {
            dispatch(deleteTransaction(transaction.id));
          });
        }

        dispatch(deleteAccount(id));
        dispatch(loadAccounts(userId));
        dispatch(loadTransactions(userId));
      }

      setShowPopup();
    }
  }

  /**
   * TODO: needed refactoring!!!
   * DRY principle
   */

  const onClickCreateButton = () => {
    if (header === "Categories") {
      if (isExists(transactions, "category", title)) {
        alert("This category already exists!");
        return;
      }
      dispatch(postCategory({title, userId, incomes, icon, hidden}));
      dispatch(loadCategories(userId));
    }
    if (header === "Accounts") {
      if (isExists(transactions, "account", title)) {
        alert("This account already exists!");
        return;
      }
      dispatch(postAccount({title, userId, startBalance, balance}));
      dispatch(loadAccounts(userId));
    }

    setShowPopup();
  };

  /**
   * TODO: needed refactoring!!!
   * split into smaller components
   */

  return (
    <section className={classes.Settings}>
      <ScrollToTop />

      {prevItem.id
        ? <>
            <Button
              type="submit"
              onClick={onClickEditButton}
              disabled={prevState && !isBalanceChange || !title}
            >
              Update
            </Button>

            <Button
              type="submit"
              onClick={onClickDeleteButton}
              disabled={!prevState}
            >
              Delete
            </Button>
          </>
        : null}

      {!prevItem.id
        ? <Button
            type="submit"
            onClick={onClickCreateButton}
            disabled={!title}
          >
            Create
          </Button>
        : null}

      <div className={classes.Wrapper}>

        <div className={classes.Type}>
          <p className={classes.Label}>{`Name of ${header === "Categories" ? "category" : "account"}`}</p>
          <input
            className={classes.Input}
            type="text"
            value={title}
            onChange={onChangeItem}
            placeholder={`Type the new name for the ${header === "Categories" ? "category" : "account"}`}
          />
        </div>
        {header !== "Accounts"
          ? <>
              <div className={classes.Type}>
                {isExists(transactions, "category", prevItem.title)
                  ? <p className={classes.Label}>This category is already used in transactions and this setting cannot be changed.</p>
                  : <p className={classes.Label}>Select <b>incomes</b> if the category is taken into income transactions</p>}
                <input
                  type="checkbox"
                  checked={+incomes || false}
                  id={id}
                  onChange={onChangeType}
                  disabled={isExists(transactions, "category", prevItem.title)}
                />
                <label
                  htmlFor={id}
                >Incomes</label>
              </div>

              <div className={classes.Type}>
                <p className={classes.Text}>Choose an icon for the category</p>
                <PopupIconList
                  onChange={onChangeIcon}
                  icon={icon}
                  />
              </div>
            </>
          : null}
        {isExists(transactions, "category", prevItem.title)
          ? <div className={classes.WrapperText}>
              <p className={classes.Text}>{isExpense(transactions, prevItem.title) ? "Expenses" : "Incomes"} in this Month - <b>{getCurrentCategorySum(filteredTransactions, prevItem.title)}€</b></p>
              <p className={classes.Text}>{isExpense(transactions, prevItem.title) ? "Expenses" : "Incomes"} for all time - <b>{getCategoryTotalSum(transactions, prevItem.title)}€</b></p>
            </div>
          : null}

        {header == "Accounts"
          ? <>
              <div className={classes.Type}>
                <p className={classes.Label}>Start balance</p>
                <input
                  className={classes.Input}
                  type="number"
                  value={accountState.startBalance === 0 ? "" : accountState.startBalance}
                  onChange={onChangeStartBalance}
                  placeholder="0.00"
                  disabled={prevItem.startBalance || prevItem.title}
                />
              </div>
              {prevItem.startBalance || prevItem.title
                ? <div className={classes.Type}>
                    <p className={classes.Label}>Current balance</p>

                    {isBalanceChange
                      ? <p className={classes.Text}><b>{prevItem.id ? balance : 0}€</b></p>
                      : null}

                    <input
                      className={classes.Input}
                      type="number"
                      value={accountState.balance === 0 ? "" : accountState.balance}
                      onChange={onChangeBalance}
                      placeholder="0.00"
                    />
                  </div>
                  : null}
              {isBalanceChange
                ? <div className={classes.Type}>
                    <input
                      type="checkbox"
                      checked={accountState.showInBalance}
                      id={id}
                      onChange={onClickBalanceCheck}
                      disabled={isExists(transactions, "category", prevItem.title)}
                    />
                    {balanceDifference > 0
                      ? <label htmlFor={id}>Add <b>{Math.abs(balanceDifference)}€</b> difference as an income transaction?</label>
                      : <label htmlFor={id}>Add <b>{Math.abs(balanceDifference)}€</b> difference as an expense transaction?</label>}
                  </div>
                : null}
                {isBalanceChange && accountState.showInBalance
                  ? <input
                      className={classes.Input}
                      type="date"
                      value={date}
                      onChange={onChangeDate}
                    />
                  : null}
            </>
          : null}
      </div>
    </section>
  );
}

export default SettingsPopup;
