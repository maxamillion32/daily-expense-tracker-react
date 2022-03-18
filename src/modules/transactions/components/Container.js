import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";

import classes from "./Container.module.css";
import {
  setIsButtonShow,
  isLoading,
  currentYear,
  selectFilteredTransactions,
  isAddButtonClick,
  setIsAddButtonClick,
  selectAllTransactionsState
} from "../../../reducers/transactions/transactions-slice";
import {selectAllCategoriesState} from "../../../reducers/categories/categories-slice";
import {selectAllAccountsState} from "../../../reducers/accounts/accounts-slice";
import {selectUserId} from "../../../reducers/user/user-slice";

import Search from "./Search/Search";
import Balance from "./Balance/Balance";
import TransactionsListContainer from "./List/Container";
import Loader from "../../common/components/Loader/Loader";
import Welcome from "../../welcome/components/Welcome";
import Chart from "./Chart/Chart";
import Popup from "../../common/components/Popup/Popup";
import TransactionCreateForm from "../../common/components/CreateForm/Form";

import {getMaxAmountPerYear} from "../../common/utils/utils";
import {formatMonth, formatYear} from "../../common/utils/utils";
import {MONTH_EXPENSES} from "../../statistics/components/YearExpenses/constant";

const getExpenses = (year, transactions, toggle) => {
  return MONTH_EXPENSES.map(item => {
    const month = item ? {name: item.toString().substr(0, 3)} : null;
    const prevYear = (+year-1).toString();

    return {
      ...month,
      current: transactions
        .filter((transaction) => formatYear(transaction.date) === year)
        .filter(transaction => formatMonth(transaction.date) === item)
        .map((transaction) => (toggle ? transaction.expense : !transaction.expense)
        ? transaction = +transaction.sum
        : transaction = null)
        .reduce((acc, sum) => acc + sum, 0).toFixed(2),
      previous: transactions
        .filter((transaction) => formatYear(transaction.date) === prevYear)
        .filter(transaction => formatMonth(transaction.date) === item)
        .map((transaction) => (toggle ? transaction.expense : !transaction.expense)
        ? transaction = +transaction.sum
        : transaction = null)
        .reduce((acc, sum) => acc + sum, 0).toFixed(2)
    };
  });
};

function TransactionsContainer() {
  const loading = useSelector(isLoading);
  const userId = useSelector(selectUserId);
  const getCurrentYear = useSelector(currentYear);
  const getIsAddButtonClick = useSelector(isAddButtonClick);
  const getTransactions = useSelector(selectAllTransactionsState);
  const getFilteredTransactions = useSelector(selectFilteredTransactions);
  const getCategories = useSelector(selectAllCategoriesState);
  const getAccounts = useSelector(selectAllAccountsState);
  const transactions = [...getTransactions];
  const filteredTransactions = [...getFilteredTransactions];
  const categories = [...getCategories];
  const accounts = [...getAccounts];
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(true);

  const isLoader = loading && userId;
  const isTransactions = transactions.length !== 0;

  const chartData = getExpenses(getCurrentYear, transactions, toggle);

  const maxMonthExpensePerYear = getMaxAmountPerYear(getCurrentYear, "expenses", transactions);
  const maxMonthIncomePerYear = getMaxAmountPerYear(getCurrentYear, "income", transactions);

  const header = toggle ? "Expenses" : "Incomes";
  const yRange = toggle ? maxMonthExpensePerYear * 2 : maxMonthIncomePerYear * 2;

  const handleClick = () => {
    setToggle(prev => !prev);
  };

  const handlePopupClose = () => {
      dispatch(setIsAddButtonClick());
      dispatch(setIsButtonShow(true));
  };

  useEffect(() => {
    dispatch(setIsButtonShow(true));
    return () => {
      dispatch(setIsButtonShow(false));
    };
  }, [userId]);

  return (
    <>
      {userId
        ? <section className={classes.Container}>
            <Popup
              showPopup={getIsAddButtonClick}
              setShowPopup={handlePopupClose}
            >
              <TransactionCreateForm
                categories={categories}
                accounts={accounts}
                onClickAddBtn={getIsAddButtonClick}
              />
            </Popup>
            {isLoader
              ? <Loader />
              : <>
                  <Chart data={chartData} onClick={handleClick} header={header} yRange={yRange} />
                  <Balance />
                </>
              }
            {isTransactions ? <Search /> : null}
            <TransactionsListContainer isLoading={isLoader} transactions={transactions} filteredTransactions={filteredTransactions} categories={categories}
                accounts={accounts}/>
          </section>
        : <Welcome />
      }
    </>
  );
}

export default TransactionsContainer;
