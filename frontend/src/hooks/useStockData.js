import { useQuery } from "react-query";
import axios from "axios";

const fetchStockData = async (symbol) => {
  try {
    const response = await axios.get('https://www.alphavantage.co/query', {
      params: {
        function: 'TIME_SERIES_MONTHLY',
        symbol: symbol,
        apikey: process.env.REACT_APP_STOCK_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching stock data");
  }
};

const useStockData = (stockSymbol) => {
  return useQuery(["stockData", stockSymbol], () =>
    fetchStockData(stockSymbol)
  );
};

export default useStockData;
