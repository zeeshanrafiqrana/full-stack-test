import React from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody
} from "@material-tailwind/react";

const TABLE_HEAD = [
  "DATE",
  "OPEN",
  "HIGH",
  "LOW",
  "CLOSE",
  "VOLUMN",
  "MOVEMENT",
];

const TABLE_ROWS = [
  {
    id: 1234,
    description: "Lorem ipsum dolar sit amet...",
    date: "23/04/18",
    account: "1000",
    fxRate: "7,45",
    convertedCurrency: "DDK",
    convertedNet: "540,15",
    convertedType: "spend",
    status: "BOOKED",
    reconciled: "YES",
  },
  {
    id: 1224,
    description: "Lorem ipsum dolar sit amet...",
    date: "23/04/18",
    account: "1000",
    fxRate: "7,45",
    convertedCurrency: "DDK",
    convertedNet: "540,15",
    convertedType: "spend",
    status: "BOOKED",
    reconciled: "YES",
  },
  {
    id: 1237,
    description: "Lorem ipsum dolar sit amet...",
    date: "23/04/18",
    account: "1000",
    fxRate: "7,45",
    convertedCurrency: "DDK",
    convertedNet: "540,15",
    convertedType: "spend",
    status: "BOOKED",
    reconciled: "YES",
  },
  {
    id: 1134,
    description: "Lorem ipsum dolar sit amet...",
    date: "23/04/18",
    account: "1000",
    fxRate: "7,45",
    convertedCurrency: "DDK",
    convertedNet: "540,15",
    convertedType: "spend",
    status: "BOOKED",
    reconciled: "YES",
  },
];

const SharePriceList = () => {
  return (
    <>
      <Card className="bg-white rounded-lg h-full w-full p-5 mt-4">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none"
        ></CardHeader>
        <CardBody className="tableCardBody px-0">
          <table className="tableHead w-full min-w-max table-auto text-left w-5/6">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
            <tbody className="tableBody">
              {TABLE_ROWS.map(
                (
                  {
                    id,
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
                  return (
                    <tr key={id} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#edf2f7' }} className={`tableFirstWrapper`}>
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
                          className="font-normal"
                        >
                          {status}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div>
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
    </>
  );
};

export default SharePriceList;
