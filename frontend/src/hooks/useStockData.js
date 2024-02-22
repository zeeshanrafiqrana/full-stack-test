// src/hooks/useStockData.js
import { useQuery } from "react-query";
import axios from "axios";

const fetchStockData = async (stockSymbol, startDate) => {
  // Fetch data from Alpha Vantage API
  const response = await axios.get(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=YOUR_API_KEY`
  );
  return response.data;
};

const useStockData = (stockSymbol, startDate) => {
  return useQuery(["stockData", stockSymbol, startDate], () =>
    fetchStockData(stockSymbol, startDate)
  );
};

export default useStockData;
