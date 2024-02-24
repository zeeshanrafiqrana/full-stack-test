import React, { useEffect, useState } from "react";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,  
} from "@material-tailwind/react";
import { useQuery } from 'react-query';


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

const TABLE_ROWS = [
  {
    id: 1234,
    description: "Lorem ipsum dolar sit amet...",
    date: "23/04/18",
    account: "1000",
    inputType: "Credit",
    inputCurrency: "EUR",
    inputNet: "540,15",
    fxRate: "7,45",
    convertedCurrency: "DDK",
    convertedNet: "540,15",
    convertedType: "spend",
    status: "BOOKED",
    reconciled: "YES",
  },
  {
    id: 1244,
    description: "Lorem ipsum dolar sit amet...",
    date: "23/04/18",
    account: "1000",
    inputType: "Credit",
    inputCurrency: "EUR",
    inputNet: "540,15",
    fxRate: "7,45",
    convertedCurrency: "DDK",
    convertedNet: "540,15",
    convertedType: "spend",
    status: "DRAFT",
    reconciled: "NO",
  },
  {
    id: 3234,
    description: "Lorem ipsum dolar sit amet...",
    date: "23/04/18",
    account: "1000",
    inputType: "Credit",
    inputCurrency: "EUR",
    inputNet: "540,15",
    fxRate: "7,45",
    convertedCurrency: "DDK",
    convertedNet: "540,15",
    convertedType: "spend",
    status: "VOIDED",
    reconciled: "NO",
  },
  {
    id: 3234,
    description: "Lorem ipsum dolar sit amet...",
    date: "23/04/18",
    account: "1000",
    inputType: "Credit",
    inputCurrency: "EUR",
    inputNet: "540,15",
    fxRate: "7,45",
    convertedCurrency: "DDK",
    convertedNet: "540,15",
    convertedType: "spend",
    status: "OVERDUE",
    reconciled: "NO",
  },
];

const EntryList = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case "BOOKED":
        return "bg-sky-200 text-sky-600 text-center p-1 rounded-md";
      case "DRAFT":
        return "bg-purple-200 text-purple-600 text-center p-1 rounded-md";
      case "OVERDUE":
        return "bg-red-200 text-red-600 text-center p-1 rounded-md";
      case "VOIDED":
        return "bg-gray-300 text-gray-600 text-center p-1 rounded-md";
      default:
        return "";
    }
  };

  // const [entryList, SetEntryList] = useState([])
  // const [isError, setIsError] = useState(false);

  // useEffect(() => {
  //     fetch('https://827c-72-255-34-130.ngrok-free.app/api/journal-entries/?page_size=10&page=1').then((response) => {
  //         if (response.ok) {
  //             return response.json();
  //         } else {
  //             throw 'Error getting entryList list'
  //         }
  //     }).then((data) => {
  //         SetEntryList(data);
  //         console.log("all data",data)
  //     }).catch((error) => {
  //         setIsError(true)
  //     })
  // }, [])


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
            </div>
          </CardHeader>
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
                {TABLE_ROWS.map(
                  (
                    {
                      id,
                      date,
                      description,
                      account,
                      inputType,
                      inputCurrency,
                      inputNet,
                      fxRate,
                      convertedCurrency,
                      convertedNet,
                      convertedType,
                      status,
                      reconciled,
                    },
                    index
                  ) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";
                    const reconciledClasses = reconciled === "YES" ? "text-green-500 bg-green-100 text-center rounded-md" : "text-red-500 bg-red-100 text-center  rounded-md";

                    return (
                      <tr key={id}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {id}
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
                            {date}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {account}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {inputType}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {inputCurrency}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {inputNet}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {fxRate}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {convertedCurrency}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {convertedNet}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {convertedType}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className={`font-normal ${getStatusColor(status)}`}

                          >
                            {status}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className={`flex flex-col ${reconciledClasses}`}>

                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {reconciled}
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
