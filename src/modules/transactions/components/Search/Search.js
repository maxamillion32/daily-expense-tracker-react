import React, {useSelector, useDispatch} from "react-redux";
import {setSearchTerm, selectSearchTerm, clearSearchTerm} from "../../../../reducers/search/search-slice";
import {selectAllCategoriesState} from "../../../../reducers/categories/categories-slice";
import CloseButton from "../../../common/components/CloseButton/CloseButton";
import classes from "./Search.module.css";

function Search() {
  const searchTerm = useSelector(selectSearchTerm);
  const getCategories = useSelector(selectAllCategoriesState);
  const categories = [...getCategories];
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
        list="categories"
        autoComplete="off"
      />
      <datalist id="categories">
        {categories.map((category) =>
          <option key={category.id} value={category.title} />
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
