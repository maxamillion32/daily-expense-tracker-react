import React from "react";
import {useSelector} from "react-redux";

import {selectAllTransactionsState} from "../../../../reducers/transactions/transactions-slice";
import {selectFilteredCategories} from "../../../../reducers/categories/categories-slice";
import {selectFilteredAccounts} from "../../../../reducers/accounts/accounts-slice";

import {formatYear} from "../../../common/utils/utils";
import TransactionsItemsYearGroup from "./Items/YearGroup";
import classes from "./Container.module.css";

function TransactionsListContainer() {
  const getTransactions = useSelector(selectAllTransactionsState);
  const getCategories = useSelector(selectFilteredCategories);
  const getAccounts = useSelector(selectFilteredAccounts);
  const transactions = [...getTransactions];
  const categories = [...getCategories];
  const accounts = [...getAccounts];

  const isEmpty = categories.length === 0 || accounts.length === 0;
  const years = [...new Set(transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(date => formatYear(date.date)))];

  return (
    <section className="transactions">

      {isEmpty
        ? <p className={classes.Message}>
            Create categories and accounts
            <br/>
            in the settings to be able to add transactions
          </p>
        : null}

      {!isEmpty && transactions.length === 0
        ? <p className={classes.Message}>
            Create your first transaction!
          </p>
        : null}

      {years.map((year) =>
        <TransactionsItemsYearGroup year={year} key={year} />
      )}
    </section>
  );
}

export default TransactionsListContainer;
