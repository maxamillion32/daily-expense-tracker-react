import React from "react";
import {useSelector} from "react-redux";

import {selectFilteredTransactions} from "../../../../reducers/transactions/transactions-slice";
import {selectAllCategoriesState} from "../../../../reducers/categories/categories-slice";
import {selectAllAccountsState} from "../../../../reducers/accounts/accounts-slice";

import {formatMonth} from "../../../common/utils/utils";
import TransactionsItemsMonthGroup from "./Items/MonthGroup";
import classes from "./Container.module.css";

function TransactionsListContainer() {
  const getCategories = useSelector(selectAllCategoriesState);
  const getAccounts = useSelector(selectAllAccountsState);
  const categories = [...getCategories];
  const accounts = [...getAccounts];

  const isEmpty = categories.length === 0 || accounts.length === 0;

  const transactions = useSelector(selectFilteredTransactions);
  const months = [...new Set(transactions
    .map(date => formatMonth(date.date)))];

  return (
    <section className="transactions">
      {isEmpty
        ? <p className={classes.Message}>
            Create categories and accounts
            <br/>
            in the settings to be able to add transactions
          </p>
        : null}
      {months.map((month) =>
        <TransactionsItemsMonthGroup month={month} key={month} />
      )}
    </section>
  );
}

export default TransactionsListContainer;
