import React, {useState} from "react";
import {useSelector} from "react-redux";
import classes from "./Chart.module.css";
import {AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer} from "recharts";
import ArrowButton from "../../../common/components/ArrowButton/ArrowButton";
import {getMaxAmountPerYear, formatMonth, formatYear} from "../../../common/utils/utils";
import {MONTH_EXPENSES} from "../../../statistics/components/YearExpenses/constant";

import {selectAllTransactionsState, currentYear} from "../../../../reducers/transactions/transactions-slice";

//TODO: move to utils
const getExpenses = (year, transactions, toggle) => {
  return MONTH_EXPENSES.map(item => {
    const month = item ? {name: item.toString().substr(0, 3)} : null;
    const prevYear = (+year-1).toString();

    return {
      ...month,
      current: transactions
        .filter((transaction) => formatYear(transaction.date) === year)
        .filter(transaction => formatMonth(transaction.date) === item)
        .map((transaction) => (toggle ? transaction.expense : !transaction.expense)
        ? transaction = +transaction.sum
        : transaction = null)
        .reduce((acc, sum) => acc + sum, 0).toFixed(2),
      previous: transactions
        .filter((transaction) => formatYear(transaction.date) === prevYear)
        .filter(transaction => formatMonth(transaction.date) === item)
        .map((transaction) => (toggle ? transaction.expense : !transaction.expense)
        ? transaction = +transaction.sum
        : transaction = null)
        .reduce((acc, sum) => acc + sum, 0).toFixed(2)
    };
  });
};

function Chart() {
  const getTransactions = useSelector(selectAllTransactionsState);
  const getCurrentYear = useSelector(currentYear);
  const transactions = [...getTransactions];

  const [toggle, setToggle] = useState(true);

  const data = getExpenses(getCurrentYear, transactions, toggle);

  const maxMonthExpensePerYear = getMaxAmountPerYear(getCurrentYear, "expenses", transactions);
  const maxMonthIncomePerYear = getMaxAmountPerYear(getCurrentYear, "income", transactions);

  const header = toggle ? "Expenses" : "Incomes";
  const yRange = toggle ? maxMonthExpensePerYear * 2 : maxMonthIncomePerYear * 2;

  const handleClick = () => {
    setToggle(prev => !prev);
  };

  return (
    <div className={classes.Chart}>
      <ArrowButton direction={"left"} onClick={handleClick} style={{top: 13}} />

      <h3>{header}</h3>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{top: 15, right: 20, left: 20}}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#000000" stopOpacity={0}/>
              <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a7a7a7" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#a7a7a7" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#a7a7a7" strokeDasharray="1 4" horizontal={false}/>
          <XAxis dataKey="name" hide={false} axisLine={false} tickLine={false}/>
          <YAxis hide={true} axisLine={false} tick={false} type="number" domain={[0, yRange]}/>
          <Tooltip />
          <Area
            type="monotone"
            // dot={{stroke: "#a7a7a7", strokeWidth: 1}}
            dataKey="previous"
            stroke="#a7a7a7"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
          <Area
            type="monotone"
            // dot={{stroke: "#000000", strokeWidth: 1}}
            dataKey="current"
            stroke="#000000"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>

      <ArrowButton direction={"right"} onClick={handleClick} style={{top: 13}} />
    </div>
  );
}

export default Chart;
