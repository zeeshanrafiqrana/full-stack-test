import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import "../index.css";


const TABLE_HEAD = [
  "ID",
  "DESCRIPTION",
  "DATE",
  "ACCOUNT",
  "TYPE",
  "CURRENCY",
  "NET",
  "FX RATE",
  "CURRENY",
  "NET",
  "TYPE",
  "STATUS",
  "RECONCILED",
];

const EntryList = () => {
  const [entryList, SetEntryList] = useState([])
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [row, setRow] = useState(10);

  const getStatusColor = (state) => {
    switch (state) {
      case "booked":
        return "bg-teal-200 text-teal-600 text-center p-1 rounded-md";
      case "draft":
        return "bg-sky-200 text-sky-700 text-center p-1 rounded-md";
      case "overue":
        return "bg-red-200 text-red-070 text-center p-1 rounded-md";
      case "voided":
        return "bg-gray-300 text-gray-600 text-center p-1 rounded-md";
      default:
        return "";
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8000/api/journal-entries/?page_size=${row}&page=${page}`).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw 'Error getting entryList list'
      }
    }).then((data) => {
      SetEntryList(data.results);
      console.log("all data", JSON.stringify(data.results))
    }).catch((error) => {
      setIsError(true)
    })
  }, [row, page])

  const handleRowsPerPageChange = (event) => {
    setRow(Number(event.target.value));
    setPage(1);
  };

  return (
    <>
      <div class="mx-3">
        <Card className="h-full w-full p-5">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h3" color="blue-gray">
                  Entry List
                </Typography>
              </div>
              <div>
                <select
                  className="bg-white border border-blue-gray-200 rounded-md px-3 py-1"
                  value={row}
                  onChange={handleRowsPerPageChange}
                >
                  <option ></option>
                  <option value={25}>25</option>
                  <option value={100}>100</option>
                  <option value="all">All</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <div className="flex flex-row custom-parent-header">
            <div className="input-underline">
              <Typography variant="small" color="blue-gray" className="font-bold leading-none opacity-70 text-center">
                INPUT AMOUNT
              </Typography>
            </div>
            <div className="convert-underline">
              <Typography variant="small" color="blue-gray" className="font-bold leading-none opacity-70 text-center">
                CONVERTED CURRENCY
              </Typography>
            </div>
          </div>
          <CardBody className="overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entryList.map(
                  (
                    {
                      id,
                      description,
                      accounting_date,
                      accounting_type,
                      currency_detail,
                      account_detail,
                      amount,
                      state,
                      reconciled,
                    },
                    index
                  ) => {
                    const isLast = index === entryList.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";
                    const reconciledClasses = reconciled === true ? "text-green-500 bg-green-100 text-center mx-10 rounded-md" : "text-red-700 bg-red-200 mx-10 text-center rounded-md";

                    return (
                      <tr key={id} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#edf2f7' }} >
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {id.slice(-6)}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                              style={{}}
                            >
                              {description}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {new Date(accounting_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {account_detail && account_detail.number}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {account_detail.default_accounting_type.charAt(0).toUpperCase() + account_detail.default_accounting_type.slice(1).toLowerCase()}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {currency_detail && currency_detail.symbol}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {amount}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            7.45
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            DKK
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {(amount * 7.45).toFixed(2)}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {accounting_type.charAt(0).toUpperCase() + accounting_type.slice(1).toLowerCase()}                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className={`font-bold ${getStatusColor(state)}`}
                          >
                            {state.toUpperCase()}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className={`flex flex-col ${reconciledClasses}`}>

                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {reconciled === true ? "YES" : "NO"}
                            </Typography>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>

    </>
  );
};

export default EntryList;
