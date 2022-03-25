import React from "react";
import {useSelector} from "react-redux";

import {selectAllTransactionsState} from "../../../../reducers/transactions/transactions-slice";
import {selectFilteredCategories} from "../../../../reducers/categories/categories-slice";
import {selectAllAccountsState} from "../../../../reducers/accounts/accounts-slice";

import {formatYear} from "../../../common/utils/utils";
import TransactionsItemsYearGroup from "./Items/YearGroup";
import classes from "./Container.module.css";

function TransactionsListContainer({isLoading}) {
  const getTransactions = useSelector(selectAllTransactionsState);
  const getCategories = useSelector(selectFilteredCategories);
  const getAccounts = useSelector(selectAllAccountsState);
  const transactions = [...getTransactions];
  const categories = [...getCategories];
  const accounts = [...getAccounts];

  const isEmpty = categories.length === 0 || accounts.length === 0;
  const years = [...new Set(transactions.map(date => formatYear(date.date)))];

  return (
    <section className="transactions">

      {!isLoading && isEmpty
        ? <p className={classes.Message}>
            Create categories and accounts
            <br/>
            in the settings to be able to add transactions
          </p>
        : null}

      {!isLoading && !isEmpty && transactions.length === 0
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
