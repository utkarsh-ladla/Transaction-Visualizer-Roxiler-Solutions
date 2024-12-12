import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { getBarChartData } from "../api/apiService";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ month }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const data = await getBarChartData(month);
        console.log("Bar Chart API Data:", data); 

        if (data && data.length > 0) {
          const labels = data.map((item) => item.range);
          const values = data.map((item) => item.count);

          setChartData({
            labels,
            datasets: [
              {
                label: "Items in Price Range",
                data: values,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          });
        } else {
          console.log("No data available for the selected month.");
        }
      } catch (error) {
        console.error("Failed to fetch bar chart data:", error);
      }
    };

    fetchBarChartData();
  }, [month]);

  if (!chartData) return <p>Loading chart...</p>;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: `Price Range Distribution for Month ${month}`,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
