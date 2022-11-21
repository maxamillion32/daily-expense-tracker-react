import React from "react";
import {useDispatch, useSelector} from "react-redux";
import classes from "./Chart.module.css";
import {AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer} from "recharts";
import ArrowButton from "../../../common/components/ArrowButton/ArrowButton";

import {
  selectChartData, selectChartToggle, selectMaxMonthExpensePerYear, selectMaxMonthIncomePerYear, setChartToggle
} from "../../../../reducers/transactions/transactions-slice";

function Chart() {
  const getChartData =useSelector(selectChartData);
  const getMaxMonthExpensePerYear = useSelector(selectMaxMonthExpensePerYear);
  const getMaxMonthIncomePerYear = useSelector(selectMaxMonthIncomePerYear);
  const getSelectChartToggle = useSelector(selectChartToggle);

  const dispatch = useDispatch();

  const header = getSelectChartToggle ? "Expenses" : "Incomes";
  const yRange = getSelectChartToggle ? getMaxMonthExpensePerYear * 2 : getMaxMonthIncomePerYear * 2;

  const handleClick = () => {
    dispatch(setChartToggle());
  };

  return (
    <section className={classes.Chart}>
      <ArrowButton direction={"left"} onClick={handleClick} style={{top: 13}} />

      <h3>{header}</h3>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={getChartData} margin={{top: 15, right: 20, left: 20}}>
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
    </section>
  );
}

export default Chart;
