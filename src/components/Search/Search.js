import React, {useSelector, useDispatch} from "react-redux";
import {setSearchTerm, selectSearchTerm, clearSearchTerm} from "../../reducers/search/search-slice";
import CloseButton from "../UI/CloseButton/CloseButton";
import classes from "./Search.module.css";

function Search() {
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

  const onSearchTermChangeHandler = (e) => {
    const userInput = e.target.value;
    dispatch(setSearchTerm(userInput));
  };

  const onClearSearchTermHandler = () => {
    dispatch(clearSearchTerm());
  };

  return (
    <section className={classes.Search}>
      <input
        type="text"
        name="search"
        placeholder="Search by category"
        value={searchTerm}
        onChange={onSearchTermChangeHandler}
      />
      {searchTerm.length > 0 && (
        <div className={classes.CloseBtn}>
          <CloseButton onClick={onClearSearchTermHandler}/>
        </div>
      )}
    </section>
  );
}

export default Search;
