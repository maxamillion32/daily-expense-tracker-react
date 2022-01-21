import React from "react";
import {useSelector} from "react-redux";
import classes from "../Balance.module.css";
import {selectFilteredTransactions} from "../../../../../reducers/transactions/transactions-slice";

import {formatMonth, formatYear} from "../../../../common/utils/utils";

import {MONTH_EXPENSES} from "../../../../statistics/components/YearExpenses/constant";

import {AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer} from "recharts";

const getExpenses = (year, transactions) => {
  return MONTH_EXPENSES.map(item => {
      const month = item ? {name: item.toString().substr(0, 3)} : null;

      return {
          ...month,
          current: transactions
            .filter((transaction) => formatYear(transaction.date) === year)
            .filter(transaction => formatMonth(transaction.date) === item)
            .map((transaction) => transaction.expense
            ? transaction = +transaction.sum
            : transaction = null)
            .reduce((acc, sum) => acc + sum, 0).toFixed(2),
          previous: transactions
            .filter((transaction) => formatYear(transaction.date) === (+year-1).toString())
            .filter(transaction => formatMonth(transaction.date) === item)
            .map((transaction) => transaction.expense
            ? transaction = +transaction.sum
            : transaction = null)
            .reduce((acc, sum) => acc + sum, 0).toFixed(2)
        };
      });
};

function Chart() {
  const transactions = useSelector(selectFilteredTransactions);

  console.log("🚀 ~ file: Chart.js ~ line 44 ~ Chart ~ getExpenses()", getExpenses("2022", transactions));
  return (
    <div className={classes.Chart}>
      <ResponsiveContainer width="100%" height={150}>
        <AreaChart data={getExpenses("2022", transactions)} margin={{top: 15, right: 20, left: 20}}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#000000" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#000000" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a7a7a7" stopOpacity={0}/>
              <stop offset="95%" stopColor="#a7a7a7" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#a7a7a7" strokeDasharray="1 4" horizontal={false}/>
          <XAxis dataKey="name" hide={false} axisLine={false} tickLine={false}/>
          <YAxis hide={true} axisLine={false} tick={false}/>
          <Tooltip />
          <Area type="monotone" dataKey="previous" stroke="#a7a7a7" fillOpacity={1} fill="url(#colorPv)"/>
          <Area type="monotone" dataKey="current" stroke="#000000" fillOpacity={1} fill="url(#colorUv)"/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
