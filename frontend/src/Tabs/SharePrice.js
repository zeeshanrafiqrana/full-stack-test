/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useStockData from "../hooks/useStockData";
import { FaCalendar } from "react-icons/fa";


import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import SharePriceList from "./SharePriceList";

const SharePrice = () => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [stockData, setStockData] = useState(null);
  const [stockDataError, setStockDataError] = useState(null);

  const { data } = useStockData();

  useEffect(() => {
    if (data && data['Monthly Time Series']) {
      const monthlyData = data['Monthly Time Series'];
      const formattedData = Object.entries(monthlyData).map(([date, data]) => ({
        month: new Date(date).toLocaleString('default', { month: 'short' }), // Converts '2024-02-23' to 'Feb'
        open: parseFloat(data['1. open']),
        high: parseFloat(data['2. high']),
        low: parseFloat(data['3. low']),
        close: parseFloat(data['4. close']),
        volume: parseFloat(data['5. volume']),
        // Include other data points if needed
      })).reverse(); // Reverse to start the graph with the oldest data
  
      setStockData(formattedData); // Update your state with the formatted data
    }
    else {
      if (data && data['Information'] ){
        setStockDataError(data['Information']);
      }
    }
  }, [data]); // Rerun the effect if `data` changes

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      "date-input": data["date-input"] ? formatDate(data["date-input"]) : null,
    };
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const CustomTooltip = ({ active, label, payload }) => {
    
    if (active && payload.length>0) {
      console.log("payload", payload)
      return (
        <div className="custom-tooltip" style={{ color: "white" }}>
          <p className="label">{`open : ${payload[0].payload.open}`}</p>
          <p className="label">{`close : ${payload[0].payload.close}`}</p>
          <p className="label">{`high : ${payload[0].payload.high}`}</p>
          <p className="label">{`low : ${payload[0].payload.low}`}</p>
          <p className="label">{`volume : ${payload[0].payload.volume}`}</p>
          <p className="label">{`month : ${payload[0].payload.month}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div className="bg-white rounded-lg overflow-hidden pb-5">
        <div className="parentShareprice p-4 sm:flex xs:grid">
          <div className="flex-1 p-4">
            <h2 className="text-lg">
              <strong>Share Price</strong>
            </h2>
            <h3 className="mr-2 text-sm">USA</h3>
          </div>
          <div className="flex-1 p-4 flex justify-end form-wrapper">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex items-center"
            >
              <h3 className="mr-2 text-sm">
                <strong>Starting Month</strong>
              </h3>
              <Controller
                control={control}
                name="date-input"
                render={({ field }) => (
                  <div className="controllerrr">
                    <div className="relative" style={{ width: "140px" }}>
                      <DatePicker
                        placeholderText="Select month"
                        onChange={(date) => {
                          setValue("date-input", date);
                        }}
                        selected={field.value}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        className="border border-gray-300 rounded-md p-2 pl-2 focus:outline-none focus:border-blue-500 w-full"
                      />
                      <div className="absolute top-2 right-3">
                        <FaCalendar size={20} color="#57E9E0" />
                      </div>
                    </div>
                  </div>
                )}
              />
              {errors["date-input"] && (
                <div className="text-red-500 text-sm mt-1 ml-2">
                  Please select a month
                </div>
              )}
              <input
                type="text"
                {...register("stock", { required: true })}
                placeholder="Enter a stock symbol"
                className="border border-gray-300 rounded-md p-2 ml-2"
              />
              {errors.stock && (
                <div className="text-red-500 text-sm mt-1 ml-2">
                  Stock is required
                </div>
              )}
              <button
                type="submit"
                className="submitButton bg-blue-500 text-white py-2 px-4 rounded-md ml-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Update
              </button>
            </form>
          </div>
        </div>
        <div className="graph-box">
          <ResponsiveContainer width="100%" aspect={5}>
            {stockData && !stockDataError? <LineChart
              className="chartDataa"
              data={stockData}
              width={100}
              height={260}
            >
              <CartesianGrid
                stroke="#eee"
                strokeDasharray="10 0"
                horizontal={true}
                vertical={false}
                className="cartasianGrid"
              />
              <XAxis className="xCode" dataKey="month" />
              <YAxis />
              <Tooltip
                content={<CustomTooltip />}
                wrapperStyle={{
                  backgroundColor: "black",
                  width: "10%",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="low"
                stroke="#880ED4"
                activeDot={{ r: 8 }}
                strokeWidth={4}
              />
            </LineChart>: <div className="text-red-700 p-8">{stockDataError}</div>}
          </ResponsiveContainer>
        </div>
      </div>
      <SharePriceList />
    </>
  );
};

export default SharePrice;
