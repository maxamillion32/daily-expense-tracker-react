import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {CSSTransition} from 'react-transition-group';
import {
  setUserInput,
  setCategory,
  setAccount,
  selectNewTransactionState,
  addTransaction,
  resetState
} from '../../../reducers/transactions/transactions-slice';
import classes from './Form.module.css'
import Input from '../../UI/Input/Input';
import Select from "../../UI/Select/Select";
import Button from "../../UI/Button/Button";
import {validateForm, updateFormControls, createFormControls} from "./utils";

function TransactionCreateForm({categories, accounts, onClickAddBtn, setOnClickAddBtn}){
  const newTransactionState = useSelector(selectNewTransactionState);
  const {sum, date} = newTransactionState;
  const dispatch = useDispatch();

  const [state, setState] = useState({
    isFormValid: false,
    formControls: createFormControls()
  });

  useEffect(() => {
    const formControls = updateFormControls("date", date, state.formControls);

    setState({formControls});
    // eslint-disable-next-line
  }, [])

  const onChangeUserInput = (value, name) => {
    const formControls = updateFormControls(name, value, state.formControls);

    setState({
      formControls,
      isFormValid: validateForm(formControls)
    });

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
      const formControls = updateFormControls(selector, e.target.value, state.formControls);

      setState({
        formControls,
        isFormValid: validateForm(formControls)
      });

      const accountId = getId(accounts, e.target.value);
      dispatch(setAccount({id: accountId, title: e.target.value}));
    }

    if (selector === "category") {
      const formControls = updateFormControls(selector, e.target.value, state.formControls);

      setState({
        formControls,
        isFormValid: validateForm(formControls)
      });

      const categoryId = getId(categories, e.target.value);
      dispatch(setCategory({id: categoryId, title: e.target.value}));
    }
  };

  const onClickSubmitButton = (e) => {
    e.preventDefault();
  };

  const addTransactionHandler = () => {
    dispatch(addTransaction([newTransactionState]));
    dispatch(resetState());
    setOnClickAddBtn(false);
  };

  const nodeRef = React.useRef(null);

  return (
    <section className={classes.form} >
      <div className={classes.dialogWrapper}>
        <form onSubmit={onClickSubmitButton}>
          <CSSTransition
            in={onClickAddBtn}
            timeout={300}
            classNames={{
              enterActive: `${classes.addFormEnterActive}`,
              exitActive: `${classes.addFormExitActive}`,
            }}
            unmountOnExit
            nodeRef={nodeRef}
          >
            <div className={classes.dialog} ref={nodeRef}>
              <Input
                type="number"
                name="sum"
                placeholder="0.00"
                value={sum}
                valid={state.formControls.sum.valid}
                shouldValidate={!!state.formControls.sum.validation}
                touched={state.formControls.sum.touched}
                errorMessage={state.formControls.sum.errorMessage}
                onChange={(event) => onChangeUserInput(event.target.value, event.target.name)}
              />

              <Select
                options={categories}
                defaultOption="Choose a category"
                onChange={onChangeSelectHandler("category")}

                valid={state.formControls.category.valid}
                shouldValidate={!!state.formControls.category.validation}
                touched={state.formControls.category.touched}
                errorMessage={state.formControls.category.errorMessage}
              />

              <Select
                options={accounts}
                defaultOption="Choose an account"
                onChange={onChangeSelectHandler("account")}

                valid={state.formControls.account.valid}
                shouldValidate={!!state.formControls.account.validation}
                touched={state.formControls.account.touched}
                errorMessage={state.formControls.account.errorMessage}
              />

              <Input
                type="date"
                name="date"
                value={date}
                valid={state.formControls.date.valid}
                shouldValidate={!!state.formControls.date.validation}
                touched={state.formControls.date.touched}
                errorMessage={state.formControls.date.errorMessage}
                onChange={(event) => onChangeUserInput(event.target.value, event.target.name)}
              />

              <div className={classes.dialogType}>
                <Input
                  label={"Income"}
                  type="checkbox"
                  name="outcome"
                  onChange={(event) => onChangeUserInput(event.target.value, event.target.name)}
                />
              </div>

              <Button
                type="submit"
                onClick={addTransactionHandler}
                disabled={!state.isFormValid}
              >
                Create
              </Button>
            </div>
          </CSSTransition>
        </form>
      </div>
    </section>
  );
}

export default TransactionCreateForm;
