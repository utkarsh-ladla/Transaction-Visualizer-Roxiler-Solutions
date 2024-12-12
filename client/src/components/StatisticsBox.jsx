import React, { useState, useEffect } from "react";
import { getStatistics } from "../api/apiService";

const StatisticsBox = ({ month }) => {
  const [statistics, setStatistics] = useState({
    totalSale: 0,
    totalSold: 0,
    totalNotSold: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await getStatistics(month);
        setStatistics(data);
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
      }
    };
    fetchStatistics();
  }, [month]);

  return (
    <div>
      <h3>Statistics for Month {month}</h3>
      <p>Total Sale: {statistics.totalSale}</p>
      <p>Total Sold Items: {statistics.totalSold}</p>
      <p>Total Not Sold Items: {statistics.totalNotSold}</p>
    </div>
  );
};

export default StatisticsBox;
