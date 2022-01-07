import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {updateCategory, loadCategories, selectPopupItemState, setPopupItem, deleteCategory, selectPopupPrevItemState, postCategory, selectAllCategoriesState} from "../../../reducers/categories/categories-slice";
import {selectAllTransactionsState} from "../../../reducers/transactions/transactions-slice";
import {selectUserId} from "../../../reducers/user/user-slice";
import classes from "./Settings.module.css";
import {usePopup} from "../../../hoc/Popup/PopupContext";
import {deleteAccount, postAccount, updateAccount, selectAllAccountsState, loadAccounts} from "../../../reducers/accounts/accounts-slice";
import ScrollToTop from "../../../hoc/ScrollToTop/ScrollToTop";

function PopupSettings() {
  const dispatch = useDispatch();
  const popupState = useSelector(selectPopupItemState);
  const popupPrevState = useSelector(selectPopupPrevItemState);
  const transactions = useSelector(selectAllTransactionsState);
  const categories = useSelector(selectAllCategoriesState);
  const accounts = useSelector(selectAllAccountsState);
  const userId = useSelector(selectUserId);
  const {toggle} = usePopup();
  const {id, title, incomes, header} = popupState;

  const prevState = JSON.stringify(popupState) === JSON.stringify(popupPrevState);

  const isExists = (data, item) => {
    return data.find((it) => it.title === item) ? true : false;
  };

  const isDelete = (data, type, id) => {
    return data.find((it) => it[`${type}Id`] === id) ? true : false;
  };

  const onChangeType = async ({target}) => {
    dispatch(setPopupItem({id, title, userId, incomes: target.checked, header}));
  };

  const onChangeItem = ({target}) => {
    const value = target.value;
    const type = incomes ? incomes : false;
    dispatch(setPopupItem({id, title: value, userId, incomes: type, header}));
  };

  const onClickEditButton = () => {
    if (header === "Categories") {
      dispatch(updateCategory(popupState));
      dispatch(loadCategories());
    }
    if (header === "Accounts") {
      dispatch(updateAccount(popupState));
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
      {popupPrevState.id && <button
        className={classes.Button}
        onClick={onClickEditButton}
        disabled={prevState || !title}
      >Update</button>}
      {!popupPrevState.id && <button
        className={classes.Button}
        onClick={onClickCreateButton}
        disabled={!title}
      >Create</button>}

      {popupPrevState.id && <button
        className={classes.Button}
        onClick={onClickDeleteButton}
        // disabled={!popupPrevState.id}
      >Delete</button>}

      <div className={classes.Wrapper}>
        <p className={classes.Label}>{`Name of ${header === "Categories" ? "category" : "account"}`}</p>
        <input
          className={classes.Input}
          type="text"
          value={title}
          onChange={onChangeItem}
          placeholder={`Type the new name for the ${header === "Categories" ? "category" : "account"}`}
        />
        {header !== "Accounts" && <div className={classes.Type}>
          <p className={classes.Label}>Select `incomes` if the category is taken into income transactions</p>
          <input
            type="checkbox"
            checked={+incomes || false}
            onChange={onChangeType}
          />
          <label
            // htmlFor={htmlFor}
          >Incomes</label>
        </div>}
      </div>
    </section>
  );
}

export default PopupSettings;
