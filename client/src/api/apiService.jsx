import axios from "axios";

const API_BASE_URL = "/api";

export const getTransactions = async (params) => {
  const response = await axios.get(`${API_BASE_URL}/transactions`, { params });
  return response.data;
};

export const getStatistics = async (month) => {
  const response = await axios.get(`${API_BASE_URL}/transactions/statistics`, {
    params: { month },
  });
  return response.data;
};

export const getBarChartData = async (month) => {
  const response = await axios.get(`${API_BASE_URL}/transactions/bar-chart`, {
    params: { month },
  });
  return response.data;
};
