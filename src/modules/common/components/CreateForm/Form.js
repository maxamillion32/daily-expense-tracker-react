import React, {useState, useEffect, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
// import {CSSTransition} from "react-transition-group";

import classes from "./Form.module.css";

import {
  setUserInput,
  setCategory,
  setAccount,
  selectNewTransactionState,
  postTransaction,
  resetState,
  setIsAddButtonClick,
  loadTransactions,
  setIsButtonShow
} from "../../../../reducers/transactions/transactions-slice";
import {selectUserId} from "../../../../reducers/user/user-slice";

import Input from "../../../common/components/Input/Input";
import Select from "../../../common/components/Select/Select";
import Button from "../../../common/components/Button/Button";

import {validateForm, updateFormControls, createFormControls} from "./utils";

function TransactionCreateForm({categories, accounts}){
  const userId = useSelector(selectUserId);
  const newTransactionState = useSelector(selectNewTransactionState);
  const {sum, date} = newTransactionState;
  const dispatch = useDispatch();

  const [state, setState] = useState({
    isFormValid: false,
    formControls: createFormControls()
  });

  useEffect(() => {
    const formControls = updateFormControls("date", date, state.formControls);

    setState({...state, formControls});
    // eslint-disable-next-line
  }, [])

  const onChangeUserInput = (value, name) => {
    const formControls = updateFormControls(name, value, state.formControls);

    setState({
      formControls,
      isFormValid: validateForm(formControls)
    });

    dispatch(setUserInput({name, value}));
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
    };

    if (selector === "account") {
      const formControls = updateFormControls(selector, e.target.value, state.formControls);

      setState({
        formControls,
        isFormValid: validateForm(formControls)
      });

      const accountId = getId(accounts, e.target.value);
      dispatch(setAccount(accountId));
    }

    if (selector === "category") {
      const formControls = updateFormControls(selector, e.target.value, state.formControls);

      setState({
        formControls,
        isFormValid: validateForm(formControls)
      });

      const categoryId = getId(categories, e.target.value);
      dispatch(setCategory(categoryId));
    }
  };

  const onClickSubmitButton = (e) => {
    e.preventDefault();
  };

  const addTransactionHandler = () => {
    dispatch(postTransaction({...newTransactionState, userId}));
    dispatch(resetState());
    dispatch(setIsAddButtonClick());
    dispatch(loadTransactions(userId));
    dispatch(setIsButtonShow(true));

    let formControls = createFormControls();
    formControls = updateFormControls("date", date, formControls);

    setState({
      formControls: formControls,
      isFormValid: false
    });
  };

  const nodeRef = React.useRef(null);

  return (
    <section className={classes.form} >
      <div className={classes.dialogWrapper}>
        <form onSubmit={onClickSubmitButton}>
          {/* <CSSTransition
            in={onClickAddBtn}
            timeout={300}
            classNames={{
              enterActive: `${classes.addFormEnterActive}`,
              exitActive: `${classes.addFormExitActive}`,
            }}
            unmountOnExit
            nodeRef={nodeRef}
          > */}
            <div className={classes.dialog} ref={nodeRef}>
              <Button
                type="submit"
                onClick={addTransactionHandler}
                disabled={!state.isFormValid}
              >
                Create
              </Button>
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
                  name="expense"
                  onChange={(event) => onChangeUserInput(event.target.value, event.target.name)}
                />
              </div>
            </div>
          {/* </CSSTransition> */}
        </form>
      </div>
    </section>
  );
}

export default TransactionCreateForm;
