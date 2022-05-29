import React, {useState, useEffect, useMemo} from "react";
import {useSelector} from "react-redux";
import classes from "./Balance.module.css";
import {selectCurrentBalance} from "../../../../reducers/transactions/transactions-slice";
import {selectAccountBalance} from "../../../../reducers/accounts/accounts-slice";
import {getMaxAmountPerYear, getExpenses, usePrevious, isEqual} from "../../../common/utils/utils";

function Balance() {
  const transactionBalance = useSelector(selectCurrentBalance);
  const accountBalance = useSelector(selectAccountBalance);

  const isTransactionsBalanceEqual = isEqual(transactionBalance, usePrevious(transactionBalance));
  const isAccountBalanceEqual = isEqual(transactionBalance, usePrevious(transactionBalance));

  const currentBalance = useMemo(() => {
    return accountBalance + transactionBalance;
  }, [isTransactionsBalanceEqual, isAccountBalanceEqual]);

  const [balanceContainer, setBalanceContainer] = useState(classes.BalanceContainer);
  const [balance, setBalance] = useState(classes.Balance);

  const listenScrollEvent = () => {
    if (window.scrollY < 60) {
      setBalanceContainer(classes.BalanceContainer);
      setBalance(classes.Balance);
    } else if (window.scrollY > 60) {
      setBalanceContainer(classes.BalanceContainerScroll);
      setBalance(classes.BalanceScroll);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () =>
      window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  return (
    <section className={balance}>
      <div className={`${balanceContainer}`}>
        <div>
          <p>Your balance:</p>
          <p className={classes.BalanceAmount}>{currentBalance.toFixed(2)} €</p>
        </div>
      </div>
    </section>
  );
}

export default Balance;
