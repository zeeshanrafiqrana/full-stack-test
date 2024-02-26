import { useQuery } from "react-query";
import axios from "axios";

const fetchStockData = async (stockSymbol, startDate) => {
  try {
    // const response = await axios.get('https://www.alphavantage.co/query', {
    //       params: {
    //         function: 'TIME_SERIES_MONTHLY',
    //         symbol: stockSymbol,
    //         apikey: process.env.REACT_APP_STOCK_API_KEY
    //       }
    //     });
    const response=await axios.get('data.json')
    return response.data;
  } catch (error) {
    throw new Error("Error fetching stock data");
  }
};

const useStockData = (stockSymbol, startDate) => {
  return useQuery(["stockData", stockSymbol, startDate], () =>
    fetchStockData(stockSymbol, startDate)
  );
};

export default useStockData;
