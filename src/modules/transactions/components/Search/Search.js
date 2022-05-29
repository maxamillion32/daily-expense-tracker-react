import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {setSearchTerm, selectSearchTerm, clearSearchTerm} from "../../../../reducers/search/search-slice";
import {selectFilteredTransactions} from "../../../../reducers/transactions/transactions-slice";
import CloseButton from "../../../common/components/CloseButton/CloseButton";
import classes from "./Search.module.css";

function Search() {
  // console.log("Search");
  const searchTerm = useSelector(selectSearchTerm);
  const getTransactions = useSelector(selectFilteredTransactions);
  const transactions = [...getTransactions];
  const dispatch = useDispatch();

  const onSearchTermChangeHandler = (e) => {
    const userInput = e.target.value;
    dispatch(setSearchTerm(userInput));
  };

  const onClearSearchTermHandler = () => {
    dispatch(clearSearchTerm());
  };

  function filterItems(items) {
    if (!searchTerm.trim()) return [];
    return [...new Set(items.filter((item) => item.category.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((transaction) => transaction.category.title))];
  }

  return (
    <section className={classes.Search}>
      <input
        type="text"
        name="search"
        placeholder="Search by category"
        value={searchTerm}
        onChange={onSearchTermChangeHandler}
        list="categories"
        autoComplete="off"
      />
      <datalist id="categories">
        {filterItems(transactions).map((category) =>
          <option key={category} value={category} />
        )}
      </datalist>
      {searchTerm.length > 0
        ? <div className={classes.CloseBtn}>
            <CloseButton onClick={onClearSearchTermHandler} />
          </div>
        : null}
    </section>
  );
}

export default Search;
