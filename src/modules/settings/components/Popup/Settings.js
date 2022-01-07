import React from "react";
import {useSelector, useDispatch} from "react-redux";

import classes from "./Settings.module.css";

import {
  updateCategory, loadCategories, deleteCategory, postCategory, selectAllCategoriesState
} from "../../../../reducers/categories/categories-slice";
import {
  selectAllTransactionsState
} from "../../../../reducers/transactions/transactions-slice";
import {
  deleteAccount, postAccount, updateAccount, selectAllAccountsState, loadAccounts
} from "../../../../reducers/accounts/accounts-slice";

import ScrollToTop from "../../../common/hoc/ScrollToTop/ScrollToTop";
import {usePopup} from "../../../common/hoc/Popup/PopupContext";

const isExists = (data, item) => {
  return data.find((it) => it.title === item) ? true : false;
};

const isDelete = (data, type, id) => {
  return data.find((it) => it[`${type}Id`] === id) ? true : false;
};

function PopupSettings({itemState, prevItem, setItem}) {
  const dispatch = useDispatch();
  const transactions = useSelector(selectAllTransactionsState);
  const categories = useSelector(selectAllCategoriesState);
  const accounts = useSelector(selectAllAccountsState);
  const {toggle} = usePopup();
  const {id, title, userId, incomes, header} = itemState;

  const prevState = JSON.stringify(itemState) === JSON.stringify(prevItem);

  const onChangeType = async ({target}) => {
    setItem({id, title, userId, incomes: target.checked, header});
  };

  const onChangeItem = ({target}) => {
    const value = target.value;
    const type = incomes ? incomes : false;
    setItem({id, title: value, userId, incomes: type, header});
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
      if (isExists(categories, title)) {
        alert("This category already exists!");
        return;
      }
      dispatch(postCategory({title, userId, incomes}));
      dispatch(loadCategories());
    }
    if (header === "Accounts") {
      if (isExists(accounts, title)) {
        alert("This account already exists!");
        return;
      }
      dispatch(postAccount({title, userId}));
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
        <p className={classes.Label}>{`Name of ${header === "Categories" ? "category" : "account"}`}</p>
        <input
          className={classes.Input}
          type="text"
          value={title}
          onChange={onChangeItem}
          placeholder={`Type the new name for the ${header === "Categories" ? "category" : "account"}`}
        />
        {header !== "Accounts"
          ? <div className={classes.Type}>
              <p className={classes.Label}>Select `incomes` if the category is taken into income transactions</p>
              <input
                type="checkbox"
                checked={+incomes || false}
                onChange={onChangeType}
              />
              <label
                // htmlFor={htmlFor}
              >Incomes</label>
            </div>
          : null}
      </div>
    </section>
  );
}

export default PopupSettings;
