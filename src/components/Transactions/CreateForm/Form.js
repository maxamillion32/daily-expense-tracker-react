import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  setUserInput,
  setCategory,
  setAccount,
  selectNewTransactionState,
  addTransaction,
  resetState
} from '../../../reducers/transactions/transactions-slice';

function TransactionCreateForm({categories, accounts}){
  const newTransactionState = useSelector(selectNewTransactionState);
  const dispatch = useDispatch();

  const [onClickAddBtn, setOnClickAddBtn] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const {sum, date} = newTransactionState;

  const onChangeUserInput = ({target}) => {
    const {name, value} = target;
    dispatch(setUserInput({name: name, value: value}));
  };

  const onChangeSelectHandler = (selector) => (e) => {
    const getId = (data, target) => {
      let idItem;
      data.map((item) => {
        if (item.title === target) {
          idItem = item.id;
        }
        return idItem;
      });
      return idItem;
    }

    if (selector === "account") {
      const accountId = getId(accounts, e.target.value);
      dispatch(setAccount({id: accountId, title: e.target.value}));
    }
    if (selector === "category") {
      const categoryId = getId(categories, e.target.value);
      dispatch(setCategory({id: categoryId, title: e.target.value}));
    }
  };

  const onClickSubmitButton = () => {
    dispatch(addTransaction([newTransactionState]));
    dispatch(resetState());
    setOnClickAddBtn(false);

    setTimeout(function () {
      setIsHidden(true);
    }, 500)
  };

  const onClickAddButton = () => {
    const isAddBtnClick = (onClickAddBtn === true) ? false : true;
    const hiddenToggle = (isHidden === true) ? false : true;

    setOnClickAddBtn(isAddBtnClick);

    if (hiddenToggle === false) {
      setIsHidden(hiddenToggle);
    } else {
      setTimeout(function () {
        setIsHidden(hiddenToggle);
      }, 500)
    }
  };

  return (
    <section className="transactions">
      <div className="transactions__title">
        <h2>Transactions</h2>
        <p
          className={`transaction-add__btn ${onClickAddBtn ? "transaction-add__btn--click" : ""}`}
          onClick={onClickAddButton}
          >
          Add
        </p>
      </div>
      <div className="transactions__wrapper">
        <div
          className={`transaction-add ${isHidden ? "transaction-add__hidden" : ""} ${onClickAddBtn ? "transaction-add__fade-in" : "transaction-add__fade-out"}`}>
          <input
            type="number"
            name="sum"
            placeholder="Enter an amount"
            value={sum}
            onChange={onChangeUserInput}
            />

          <select
            className="form-select"
            aria-label="Default select example"
            onChange={onChangeSelectHandler("category")}
            >
            <option value="" hidden>Choose a category</option>
            {categories &&
              categories.map((category) => (
                <option
                  key={category.id}
                  value={category.title}
                  selected={category.id ===  newTransactionState.category.id ? true: false}
                >{category.title}
                </option>
              ))}
          </select>

          <select
            className="form-select"
            aria-label="Default select example"
            onChange={onChangeSelectHandler("account")}
            >
            <option value="" hidden>Choose an account</option>
            {accounts &&
              accounts.map((account) => (
                <option
                  key={account.id}
                  value={account.title}
                  selected={account.id ===  newTransactionState.account.id ? true: false}
                >{account.title}
                </option>
              ))}
          </select>

          <input
            type="date"
            name="date"
            value={date}
            onChange={onChangeUserInput}
            />

          <div className="transaction-add__wrapper">
            <div className="transaction-add__type">
              <input
                type="checkbox"
                id="type"
                name="outcome"
                onChange={onChangeUserInput} />
              <label htmlFor="type">Income</label>
            </div>
          </div>

          <button className="button" onClick={onClickSubmitButton}>Create</button>
        </div>
      </div>
    </section>
  );
}

export default TransactionCreateForm;
