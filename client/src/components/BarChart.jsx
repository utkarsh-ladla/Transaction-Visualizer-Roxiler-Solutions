import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { getBarChartData } from "../api/apiService"; // Fetch bar chart data from API
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ month }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchBarChartData = async () => {
      const data = await getBarChartData(month);

      if (data && data.length > 0) {
        const chartLabels = data.map((item) => item.range); // Price ranges (e.g., "0-100")
        const chartValues = data.map((item) => item.count); // Corresponding counts

        setChartData({
          labels: chartLabels,
          datasets: [
            {
              label: "Items in Price Range",
              data: chartValues,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } else {
        console.log("No data found for the selected month.");
      }
    };

    fetchBarChartData();
  }, [month]);

  if (!chartData) return <p>Loading chart data...</p>;

  return (
    <div>
      <h3>Price Range Distribution for Month {month}</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
