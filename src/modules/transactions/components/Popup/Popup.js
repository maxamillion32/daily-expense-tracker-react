import React, {useState} from "react";
// import {useSelector, useDispatch} from "react-redux";

import classes from "./Popup.module.css";

// import {
//   updateCategory, loadCategories, deleteCategory,
//   postCategory, getBalanceIncomesId, getBalanceExpensesId
// } from "../../../../reducers/categories/categories-slice";
// import {
//   currentMonth, currentYear, postTransaction,
//   loadTransactions, deleteTransaction, selectAllTransactionsState
// } from "../../../../reducers/transactions/transactions-slice";
// import {
//   deleteAccount, postAccount, updateAccount, loadAccounts
// } from "../../../../reducers/accounts/accounts-slice";

import ScrollToTop from "../../../common/hooks/ScrollToTop/ScrollToTop";
// import PopupIconList from "./IconList/IconList";
// import Button from "../../../common/components/Button/Button";
// import {formatYear, formatMonth} from "../../../common/utils/utils";
// import {
//   isExists, isDelete, isExpense, getTransactionsByAccountId,
//   getCategoryTotalSum, getCurrentCategorySum
// } from "./utils";

function TransactionsChoiceTypePopup() {

  return (
    <section className={classes.Settings}>
      <ScrollToTop />


    </section>
  );
}

export default TransactionsChoiceTypePopup;
