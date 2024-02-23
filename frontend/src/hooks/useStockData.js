import { useQuery } from "react-query";
import axios from "axios";

const fetchStockData = async (stockSymbol, startDate) => {
  const url =  `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=CK5H3JAGHKQ6NJ96`
  try {
    // Fetch data from Alpha Vantage API
    const response = await axios.get(
      url
    );
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
