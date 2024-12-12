import React, { useState } from "react";
import TransactionTable from "./components/TransactionTable";
import StatisticsBox from "./components/StatisticsBox";
import BarChart from "./components/BarChart";

const App = () => {
  const [month, setMonth] = useState(1);

  return (
    <div>
      <h1>Product Sales Insights</h1>
      <label>Select Month: </label>
      <select onChange={(e) => setMonth(e.target.value)} value={month}>
        {[...Array(12).keys()].map((m) => (
          <option key={m + 1} value={m + 1}>
            Month {m + 1}
          </option>
        ))}
      </select>
      <StatisticsBox month={month} />
      <BarChart month={month} />
      <TransactionTable month={month} />
    </div>
  );
};

export default App;
