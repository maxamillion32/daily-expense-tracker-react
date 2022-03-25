import React, {useState} from "react";
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

import ScrollToTop from "../../../common/hooks/ScrollToTop/ScrollToTop";
import PopupIconList from "./IconList/IconList";
import Button from "../../../common/components/Button/Button";
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
  .reduce((a, b) => a + b, 0).toFixed(2);
};

const getCurrentCategorySum = (filteredTransactions, title) => {
  return filteredTransactions
  .filter((transaction) => transaction.category.title === title)
  .map((transaction) => transaction.sum)
  .reduce((a, b) => a + b, 0).toFixed(2);
};

function SettingsPopup({itemState, prevItem, setItem, transactions, setShowPopup}) {
  const dispatch = useDispatch();
  const month = useSelector(currentMonth);
  const year = useSelector(currentYear);
  const {id, title, userId, incomes, header, startBalance, balance, icon} = itemState;

  const prevState = JSON.stringify(itemState) === JSON.stringify(prevItem);
  const filteredTransactions = transactions
    .filter((transaction) => formatYear(transaction.date) === year)
    .filter((transaction) => formatMonth(transaction.date) === month);

  const [accountState, setAccountState] = useState({balance, startBalance});

  const onChangeType = async ({target}) => {
    setItem({...itemState, incomes: target.checked});
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

  // const onChangeBalance = ({target}) => {
  //   const value = target.value;
  //   setAccountState({...accountState, balance: value});
  //   setItem({...itemState, balance: value});
  // };

  const onClickEditButton = () => {
    if (header === "Categories") {
      dispatch(updateCategory({id, title, userId, incomes, icon}));
      dispatch(loadCategories(userId));
    }
    if (header === "Accounts") {
      dispatch(updateAccount({id, title, userId, startBalance, balance}));
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
        dispatch(deleteAccount(id));
        dispatch(loadAccounts(userId));
      }

      setShowPopup();
    }
  }

  const onClickCreateButton = () => {
    if (header === "Categories") {
      if (isExists(transactions, "category", title)) {
        alert("This category already exists!");
        return;
      }
      dispatch(postCategory({title, userId, incomes, icon}));
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

  return (
    <section className={classes.Settings}>
      <ScrollToTop />

      {prevItem.id
        ? <>
            <Button
              type="submit"
              onClick={onClickEditButton}
              disabled={prevState || !title}
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
              <p className={classes.Text}>{JSON.parse(isExpense(transactions, prevItem.title)) ? "Expenses" : "Incomes"} in this Month - <b>{getCurrentCategorySum(filteredTransactions, prevItem.title)}€</b></p>
              <p className={classes.Text}>{JSON.parse(isExpense(transactions, prevItem.title)) ? "Expenses" : "Incomes"} for all time - <b>{getCategoryTotalSum(transactions, prevItem.title)}€</b></p>
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
                  disabled={prevItem.startBalance}
                />
              </div>
              <div className={classes.Type}>
                <p className={classes.Label}>Current balance</p>

                <p className={classes.Text}><b>{prevItem.id ? accountState.balance : 0}€</b></p>
                {/* <input
                  className={classes.Input}
                  type="number"
                  value={accountState.balance === 0 ? "" : accountState.balance}
                  onChange={onChangeBalance}
                  placeholder="0.00"
                  // disabled={prevItem.startBalance}
                /> */}
              </div>
            </>
          : null}
      </div>
    </section>
  );
}

export default SettingsPopup;
