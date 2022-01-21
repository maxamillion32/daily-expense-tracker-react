import React from "react";
import classes from "./Chart.module.css";
import {AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer} from "recharts";

function Chart({data}) {
  return (
    <div className={classes.Chart}>
      <ResponsiveContainer width="100%" height={120}>
        <AreaChart data={data} margin={{top: 15, right: 20, left: 20}}>
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
