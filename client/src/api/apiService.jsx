import axios from "axios";

const API_BASE_URL = "/api";

export const getTransactions = async (params) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const getStatistics = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions/statistics`, {
      params: { month },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
};

export const getBarChartData = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions/bar-chart`, {
      params: { month },
    });
    console.log("Bar chart data:", response.data); 
    return response.data;
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    throw error;
  }
};

export const getPieChartData = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions/pie-chart`, {
      params: { month },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    throw error;
  }
};
