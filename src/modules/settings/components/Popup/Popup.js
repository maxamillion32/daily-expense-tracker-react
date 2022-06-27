import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";

import classes from "./Popup.module.css";

import {
  updateCategory, loadCategories, deleteCategory,
  postCategory, findIncomesBalanceCategory, findExpensesBalanceCategory
} from "../../../../reducers/categories/categories-slice";
import {
  selectCurrentMonth, selectCurrentYear, postTransaction,
  loadTransactions, deleteTransaction, selectAllTransactionsState
} from "../../../../reducers/transactions/transactions-slice";
import {
  deleteAccount, postAccount, updateAccount, loadAccounts
} from "../../../../reducers/accounts/accounts-slice";

import ScrollToTop from "../../../common/hooks/ScrollToTop/ScrollToTop";
import CategoryIcons from "./IconList/IconList";

import {
  Buttons, Title, CategoryType, CategoryExpenses,
  StartBalance, CurrentBalance, ChangeBalance, DateOfBalance
} from "./Items";

import {formatYear, formatMonth, isEqual} from "../../../common/utils/utils";
import {isExists, isDelete, getTransactionsByAccountId} from "./utils/utils";

function SettingsPopup({itemState, prevItemState, setItemState, transactions, setShowPopup}) {
  const dispatch = useDispatch();
  const month = useSelector(selectCurrentMonth);
  const year = useSelector(selectCurrentYear);
  const allTransactions = useSelector(selectAllTransactionsState);
  const incomesBalanceCategory = useSelector(findIncomesBalanceCategory);
  const expensesBalanceCategory = useSelector(findExpensesBalanceCategory);
  const {id, title, userId, incomes, header, startBalance, balance, icon, hidden, date, transfer} = itemState;

  const isStateChange = isEqual(itemState, prevItemState);
  const filteredTransactions = transactions
    .filter((transaction) => formatYear(transaction.date) === year)
    .filter((transaction) => formatMonth(transaction.date) === month);

  const [accountState, setAccountState] = useState({balance, startBalance, showInBalance: true});
  const isBalanceChange = balance && Number(accountState.balance) !== Number(balance);
  const balanceDifference = (accountState.balance - balance).toFixed(2);

  const onChangeType = async ({target}) => {
    setItemState({...itemState, incomes: target.checked});
  };

  const onClickBalanceCheck = async ({target}) => {
    setAccountState({...accountState, showInBalance: target.checked});
  };

  const onChangeItem = ({target}) => {
    const value = target.value;
    setItemState({...itemState, title: value});
  };

  const onChangeIcon = ({target}) => {
    const value = target.value;
    setItemState({...itemState, icon: value});
  };

  const onChangeStartBalance = ({target}) => {
    const value = target.value;
    setAccountState({...accountState, startBalance: value});
    setItemState({...itemState, startBalance: value});
  };

  const onChangeDate = ({target}) => {
    const date = target.value;
    setItemState({...itemState, date});
  };

  const onChangeBalance = ({target}) => {
    const value = target.value;
    setAccountState({...accountState, balance: value});
  };

  const onClickEditButton = () => {
    const trimTitle = title.trim();

    if (header === "Categories") {
      dispatch(updateCategory({id, title: trimTitle, userId, incomes, icon}));
      dispatch(loadCategories(userId));
    }
    if (header === "Accounts") {
      if (isBalanceChange) {
        const isIncome = balanceDifference <= 0;
        const isShowInBalance = accountState.showInBalance;

        const sum = Math.abs(balanceDifference);
        const expense = isIncome;
        const balanceCategoryId = isIncome ? incomesBalanceCategory.id: expensesBalanceCategory.id;
        const showInBalance = isShowInBalance;

        dispatch(postTransaction({sum, expense, date, categoryId: balanceCategoryId, accountId: id, showInBalance, userId}));
      }
      dispatch(updateAccount({id, title: trimTitle, userId, startBalance, balance: accountState.balance}));
      dispatch(loadAccounts(userId));
    }
    dispatch(loadTransactions(userId));
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

  const createByType = (type) => {
    if (isExists(transactions, type, title)) {
        alert(`This ${type} already exists!`);
        return;
      }
      type === "category"
        ? dispatch(postCategory({title, userId, incomes, icon, hidden, transfer}))
        : dispatch(postAccount({title, userId, startBalance, balance}));
  };

  const onClickCreateButton = () => {
    if (header === "Categories") {
      createByType("category");
      dispatch(loadCategories(userId));
    }
    if (header === "Accounts") {
      createByType("account");
      dispatch(loadAccounts(userId));
    }

    setShowPopup();
  };

  return (
    <section className={classes.Settings}>
      <ScrollToTop />

      <Buttons
        onClickCreateButton={onClickCreateButton}
        onClickEditButton={onClickEditButton}
        onClickDeleteButton={onClickDeleteButton}
        prevItemState={prevItemState}
        isStateChange={!isStateChange}
        isBalanceChange={isBalanceChange}
        title={title}
      />

      <div className={classes.Wrapper}>
        <Title
          header={header}
          title={title}
          onChange={onChangeItem}
          classes={classes}
        />

        {header === "Categories"
          ? <>
              <CategoryType
                transactions={transactions}
                prevItemState={prevItemState}
                incomes={incomes}
                onChange={onChangeType}
                classes={classes}
              />

              <CategoryIcons
                onChange={onChangeIcon}
                icon={icon}
              />

              <CategoryExpenses
                transactions={transactions}
                prevItemState={prevItemState}
                filteredTransactions={filteredTransactions}
                classes={classes}
              />
            </>

          : <>
              <StartBalance
                accountState={accountState}
                prevItemState={prevItemState}
                onChange={onChangeStartBalance}
                classes={classes}
              />

              <CurrentBalance
                isBalanceChange={isBalanceChange}
                prevItemState={prevItemState}
                accountState={accountState}
                onChange={onChangeBalance}
                balance={balance}
                classes={classes}
              />

              <ChangeBalance
                isBalanceChange={isBalanceChange}
                prevItemState={prevItemState}
                accountState={accountState}
                transactions={transactions}
                onClickBalanceCheck={onClickBalanceCheck}
                balanceDifference={balanceDifference}
                date={date}
                classes={classes}
              />

              <DateOfBalance
                isBalanceChange={isBalanceChange}
                onChange={onChangeDate}
                accountState={accountState}
                date={date}
              />
            </>
          }
      </div>
    </section>
  );
}

export default SettingsPopup;
