import {useSelector, useDispatch} from 'react-redux';
import {
  setUserInput,
  setCategory,
  setAccount,
  selectNewTransactionState,
  addTransaction,
  resetState
} from '../../../reducers/transactions/transactions-slice';
import classes from './Form.module.css'

function TransactionCreateForm({categories, accounts, onClickAddBtn, setOnClickAddBtn}){
  const newTransactionState = useSelector(selectNewTransactionState);
  const {sum, date} = newTransactionState;
  const dispatch = useDispatch();

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

  const onClickSubmitButton = (e) => {
    e.preventDefault();

    dispatch(addTransaction([newTransactionState]));
    dispatch(resetState());
    setOnClickAddBtn(false);
  };

  const classesDialog = [
    classes.dialog,
    onClickAddBtn ? classes.dialogFadeIn : classes.dialogFadeOut
  ].join(' ');

  return (
    <section className={classes.form} >
      <div className={classes.dialogWrapper}>
        <form onSubmit={onClickSubmitButton}>
          <div
            className={classesDialog}>
            <input
              type="number"
              name="sum"
              placeholder="0.00"
              value={sum}
              onChange={onChangeUserInput}
              required
              />

            <select
              aria-label="Default select example"
              onChange={onChangeSelectHandler("category")}
              required
              >
              <option value="" hidden>Choose a category</option>
              {categories &&
                categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.title}
                    selected={category.id ===  newTransactionState.category.id ? true: false}
                  >
                  {category.title}
                  </option>
                ))}
            </select>

            <select
              aria-label="Default select example"
              onChange={onChangeSelectHandler("account")}
              required
              >
              <option value="" hidden>Choose an account</option>
              {accounts &&
                accounts.map((account) => (
                  <option
                    key={account.id}
                    value={account.title}
                    selected={account.id ===  newTransactionState.account.id ? true: false}
                  >
                  {account.title}
                  </option>
                ))}
            </select>

            <input
              type="date"
              name="date"
              value={date}
              onChange={onChangeUserInput}
              required
              />

            <div className={classes.dialogTypeWrapper}>
              <div className={classes.dialogType}>
                <input
                  type="checkbox"
                  id="type"
                  name="outcome"
                  onChange={onChangeUserInput} />
                <label htmlFor="type">Income</label>
              </div>
            </div>

            <button className="button" type="submit">Create</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default TransactionCreateForm;
