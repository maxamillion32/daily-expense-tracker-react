import React from "react";
import {useSelector, useDispatch} from "react-redux";

import classes from "./Popup.module.css";

import {
  updateCategory, loadCategories, deleteCategory, postCategory
} from "../../../../reducers/categories/categories-slice";
import {
  currentMonth, currentYear
} from "../../../../reducers/transactions/transactions-slice";
import {
  deleteAccount, postAccount, updateAccount, loadAccounts
} from "../../../../reducers/accounts/accounts-slice";

import ScrollToTop from "../../../common/hoc/ScrollToTop/ScrollToTop";
import {usePopup} from "../../../common/hoc/Popup/PopupContext";
import {formatYear, formatMonth} from "../../../common/utils/utils";

const isExists = (data, type, item) => {
  return data.find((it) => it[type].title === item) ? true : false;
};

const isDelete = (data, type, id) => {
  return data.find((it) => it[`${type}Id`] === id) ? true : false;
};

const isExpense = (transactions, title) => {
  return [...new Set(transactions
  .filter((transaction) => transaction.category.title === title)
  .map((transaction) => transaction.expense))].join();
};

const getCategoryTotalSum = (transactions, title) => {
  return transactions
  .filter((transaction) => transaction.category.title === title)
  .map((transaction) => transaction.sum)
  .reduce((a, b) => a + b, 0);
};

const getCurrentCategorySum = (filteredTransactions, title) => {
  return filteredTransactions
  .filter((transaction) => transaction.category.title === title)
  .map((transaction) => transaction.sum)
  .reduce((a, b) => a + b, 0);
};

// const getCurrentAccountBalance = (transactions, title) => {
//   const incomes = transactions
//   .filter((transaction) => transaction.expense === false)
//   .filter((transaction) => transaction.account.title === title)
//   .map((transaction) => transaction.sum)
//   .reduce((a, b) => a + b, 0);

//   const expenses = transactions
//   .filter((transaction) => transaction.expense === true)
//   .filter((transaction) => transaction.account.title === title)
//   .map((transaction) => transaction.sum)
//   .reduce((a, b) => a + b, 0);

//   return incomes - expenses;
// };

// const getAccountStartBalance = (accounts, title) => {
//   const currentAccount = accounts
//   .find((account) => account.title === title);

//   return +currentAccount.startBalance;
// };

// const getAccountTotalBalance = (startBalance, balance) => {
//   return (balance + +startBalance).toFixed(2);
// };


function Popup({itemState, prevItem, setItem, transactions}) {
  const dispatch = useDispatch();
  // const accounts = useSelector(selectAllAccountsState);
  const month = useSelector(currentMonth);
  const year = useSelector(currentYear);
  const {toggle} = usePopup();
  const {id, title, userId, incomes, header, startBalance, balance} = itemState;

  const prevState = JSON.stringify(itemState) === JSON.stringify(prevItem);

  // const [balance, setBalance] = useState({startBalance: getAccountStartBalance(accounts, title)});

  // move to utils
  const filteredTransactions = transactions
    .filter((transaction) => formatYear(transaction.date) === year)
    .filter((transaction) => formatMonth(transaction.date) === month);

  const onChangeType = async ({target}) => {
    setItem({id, title, userId, incomes: target.checked, header});
  };

  const onChangeItem = ({target}) => {
    const value = target.value;
    const type = incomes ? incomes : false;
    setItem({id, title: value, userId, incomes: type, header, startBalance, balance});
  };

  const onChangeStartBalance = ({target}) => {
    const value = target.value;
    setItem({id, title, userId, incomes, header, startBalance: value, balance});
    dispatch(updateAccount({id, title, userId, incomes, header, startBalance: value, balance}));
    dispatch(loadAccounts());
  };

  const onClickEditButton = () => {
    if (header === "Categories") {
      dispatch(updateCategory(itemState));
      dispatch(loadCategories());
    }
    if (header === "Accounts") {
      dispatch(updateAccount(itemState));
      dispatch(loadAccounts());
    }
    toggle();
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
        dispatch(loadCategories());
      }

      if (header === "Accounts") {
        if (isDelete(transactions, "account", id)) {
          alert("This account is already in use and cannot be deleted!");
          return;
        }
        dispatch(deleteAccount(id));
        dispatch(loadAccounts());
      }

      toggle();
    }
  }

  const onClickCreateButton = () => {
    if (header === "Categories") {
      if (isExists(transactions, "category", title)) {
        alert("This category already exists!");
        return;
      }
      dispatch(postCategory({title, userId, incomes}));
      dispatch(loadCategories());
    }
    if (header === "Accounts") {
      if (isExists(transactions, "account", title)) {
        alert("This account already exists!");
        return;
      }
      dispatch(postAccount({title, userId, startBalance, balance}));
      dispatch(loadAccounts());
    }

    toggle();
  };

  return (
    <section className={classes.Settings}>
      <ScrollToTop />
      {prevItem.id
        ? <button
            className={classes.Button}
            onClick={onClickEditButton}
            disabled={prevState || !title}
          >Update</button>
        : null}
      {!prevItem.id
        ? <button
            className={classes.Button}
            onClick={onClickCreateButton}
            disabled={!title}
          >Create</button>
        : null}

      {prevItem.id
        ? <button
            className={classes.Button}
            onClick={onClickDeleteButton}
            // disabled={!popupPrevState.id}
          >Delete</button>
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
          ? <div className={classes.Type}>
              {isExists(transactions, "category", title)
                ? <p className={classes.Label}>This category is already used in transactions and this setting cannot be changed.</p>
                : <p className={classes.Label}>Select <b>incomes</b> if the category is taken into income transactions</p>}
              <input
                type="checkbox"
                checked={+incomes || false}
                id={id}
                onChange={onChangeType}
                disabled={isExists(transactions, "category", title)}
              />
              <label
                htmlFor={id}
              >Incomes</label>
            </div>
          : null}
        {isExists(transactions, "category", title)
          ? <div className={classes.WrapperText}>
              <p className={classes.Text}>{JSON.parse(isExpense(transactions, title)) ? "Expenses" : "Incomes"} in this Month - <b>{getCurrentCategorySum(filteredTransactions, title)}€</b></p>
              <p className={classes.Text}>{JSON.parse(isExpense(transactions, title)) ? "Expenses" : "Incomes"} for all time - <b>{getCategoryTotalSum(transactions, title)}€</b></p>
            </div>
          : null}

        {header == "Accounts"
          ? <>
              <div className={classes.Type}>
                <p className={classes.Label}>Start balance</p>
                <input
                  className={classes.Input}
                  type="number"
                  value={startBalance === 0 ? "" : startBalance}
                  onChange={onChangeStartBalance}
                  placeholder="0.00"
                />
              </div>
              <div className={classes.Type}>
                <p className={classes.Label}>Current balance</p>

                <p className={classes.Text}><b>{prevItem.id ? balance : 0}€</b></p>
              </div>
            </>
          : null}
      </div>
    </section>
  );
}

export default Popup;
