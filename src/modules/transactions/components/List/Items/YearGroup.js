import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import classes from "../Container.module.css";
import TransactionsItemsMonthGroup from "./MonthGroup";
import {formatYear, formatMonth, usePrevious} from "../../../../common/utils/utils";

import {selectCurrentYear, selectFilteredTransactions} from "../../../../../reducers/transactions/transactions-slice";
import {selectSearchTerm} from "../../../../../reducers/search/search-slice";

const PAGINATION = {
  INITIAL_AMOUNT: 50,
  SHIFT: 20,
};

function TransactionsItemsYearGroup({year}) {
  const getCurrentYear = useSelector(selectCurrentYear);
  const getFilteredTransactions = useSelector(selectFilteredTransactions);
  const filteredTransactions = [...getFilteredTransactions];

  const searchTerm = useSelector(selectSearchTerm);
  const prevSearchTerm = usePrevious(searchTerm);

  const [transaction, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(PAGINATION.INITIAL_AMOUNT);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (searchTerm === "" && prevSearchTerm) {
      setCurrentPage(PAGINATION.INITIAL_AMOUNT);
    }

    setTransactions(filteredTransactions.slice(0, currentPage));
    setTotalCount(transaction.length);
  }, [currentPage, searchTerm, prevSearchTerm]);

  const yearTransactions = transaction.filter((transaction) => formatYear(transaction.date) === year);
  const nodeRef = React.useRef(null);
  const months = [...new Set(yearTransactions
    .map(date => formatMonth(date.date)))];

  const isCurrentYear = getCurrentYear === year;

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    const innerHeight = window.innerHeight;

    if (scrollHeight - (scrollTop + innerHeight) < 100 && totalCount < filteredTransactions.length) {
      setCurrentPage((prevState) => prevState + PAGINATION.SHIFT);
    }
  };

  return (
    <ul className="transactions__list">
      {!isCurrentYear && <p className={classes.TransactionsYear} ref={nodeRef}>{year}</p>}
      {months.map((month) =>
        <TransactionsItemsMonthGroup transactions={yearTransactions} month={month} key={month} />
      )}
    </ul>
  );
}

export default TransactionsItemsYearGroup;
