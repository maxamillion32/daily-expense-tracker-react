import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import classes from "./Balance.module.css";
import {selectCurrentBalance} from "../../../../reducers/transactions/transactions-slice";

function Balance() {
  const currentBalance = useSelector(selectCurrentBalance);
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
          <p className={classes.BalanceAmount}>{currentBalance} €</p>
        </div>
      </div>
    </section>
  );
}

export default Balance;
