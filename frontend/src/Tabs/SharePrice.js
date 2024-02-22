import React from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

const SharePrice = () => {
  const { control, register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      "date-input": data["date-input"] ? formatDate(data["date-input"]) : null,
    };
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  };

  const chartData = [
    { month: "January", price: 65 },
    { month: "February", price: 59 },
    { month: "March", price: 80 },
    { month: "April", price: 81 },
    { month: "May", price: 56 },
    { month: "June", price: 55 },
    { month: "July", price: 40 },
    { month: "August", price: 40 },
    { month: "November", price: 40 },
    { month: "December", price: 40 },
  ];

  return (
    <div className="bg-white rounded-lg overflow-hidden pb-5">
      <div className="flex parentShareprice p-4">
        <div className="flex-1 p-4">
          <h2 className="text-lg">
            <strong>Share Price</strong>
          </h2>
          <h3 className="mr-2 text-sm">USA</h3>
        </div>
        <div className="flex-1 p-4 flex justify-end">
          <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
            <h3 className="mr-2 text-sm">
              <strong>Starting Month</strong>
            </h3>
            <div>
              <Controller
                control={control}
                name="date-input"
                render={({ field }) => (
                  <div>
                    <DatePicker
                      placeholderText="Select date"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      dateFormat="MM/dd/yyyy"
                      className="border border-gray-300 rounded-md p-2 pl-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}
              />
              {errors["date-input"] && (
                <div className="text-red-500 text-sm mt-1 ml-2">
                  Please select a date
                </div>
              )}
            </div>
            <input
              type="text"
              {...register("stock", { required: true })}
              placeholder="Enter Stock"
              className="border border-gray-300 rounded-md p-2 ml-2"
            />
            {errors.stock && (
              <div className="text-red-500 text-sm mt-1 ml-2">
                Stock is required
              </div>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md ml-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Update
            </button>
          </form>
        </div>
      </div>
      <div className="graph-box">
        <ResponsiveContainer width="100%" aspect={5}>
          <LineChart data={chartData} width={100} height={300}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SharePrice;
