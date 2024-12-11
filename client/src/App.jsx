import React, { useState } from "react";
import TransactionTable from "./components/TransactionTable.jsx";
import StatisticsBox from "./components/StatisticsBox.jsx"; // Implement later
import BarChart from "./components/BarChart.jsx"; // Implement later
import './styles.css'

const App = () => {
  const [month, setMonth] = useState("3"); // Default to March

  return (
    <div>
      <h1>Product Sales Insights Dashboard</h1>

      <div>
        <label>Select Month: </label>
        <select onChange={(e) => setMonth(e.target.value)} value={month}>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      <StatisticsBox month={month} />
      <TransactionTable month={month} />
      <BarChart month={month} />
    </div>
  );
};

export default App;
