import {useSelector, useDispatch} from 'react-redux';
import {setSearchTerm, selectSearchTerm, clearSearchTerm} from '../../reducers/search/search-slice';

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
    <section className="search">
      <input
        type="text"
        name="search"
        placeholder="Search by category"
        value={searchTerm}
        onChange={onSearchTermChangeHandler}
      />
      {searchTerm.length > 0 && (
        <span className="search__close-btn" onClick={onClearSearchTermHandler}/>
      )}
    </section>
  );
};

export default Search;
