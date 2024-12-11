import React, { useEffect, useState } from "react";
import { getStatistics } from "../api/apiService"; // Fetch statistics from API

const StatisticsBox = ({ month }) => {
  const [statistics, setStatistics] = useState({
    totalSale: 0,
    totalSold: 0,
    totalNotSold: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      const data = await getStatistics(month);
      setStatistics(data);
    };
    fetchStatistics();
  }, [month]);

  return (
    <div className="statistics-box">
      <h3>Statistics for Month {month}</h3>
      <p>Total Sale: {statistics.totalSale}</p>
      <p>Total Sold Items: {statistics.totalSold}</p>
      <p>Total Not Sold Items: {statistics.totalNotSold}</p>
    </div>
  );
};

export default StatisticsBox;
