import { dailyOpen } from "@/APIcalls/apiCall";
import Chart from "react-apexcharts";
import { DailyStock, stocksLegend } from "@/model/model";
import { Typography } from "@mui/material";
import { issueDate } from "../issueDate/issueDate";
import { useQuery } from "react-query";

const Graph = ({ res }: any) => {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => {
      if (res) {
        const { stocksTicker, date } = res;
        if (stocksTicker !== undefined && date !== undefined) {
          return dailyOpen(stocksTicker.toUpperCase(), date);
        }
      }
    },
    queryKey: ["Daily stock market"],
  });

  const { stocksTicker, date } = res;

  if (data === 429) {
    return (
      <Typography mt={10} textAlign={"center"} fontSize={"1.1rem"}>
        Hold your horses! 🐎 Too many requests Give it a sec and try again!
      </Typography>
    );
  }
  let options: any = null;
  let sequence = null;

  if (data !== undefined && data !== 404 && data?.status !== 400 && data?.status !== 404 && data?.status !== 429) {
    const keyMapping: DailyStock = {
      open: "Opening Price",
      high: "Highest Price",
      low: "Lowest Price",
      close: "Closing Price",
      volume: "Trading Volume",
      afterHours: "After hours Price",
      preMarket: "Pre-market Price",
    };

    const keys = ["open", "high", "low", "close", "afterHours", "preMarket"];

    const categories = keys.filter((key) => key in data);
    const series = categories.map((key) => data[key]);

    options = {
      chart: {
        type: "bar",
        width: "100%",
        height: 10,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "80%",
        },
      },
      legend: {
        show: true,
      },
      noData: {
        text: "Loading...",
      },
      xaxis: {
        categories: categories,
      },
      responsive: [
        {
          breakpoint: 100,
          yaxis: {
            categories: categories,
          },
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
          },
        },
      ],
    };

    sequence = [
      {
        name: stocksTicker,
        data: series,
      },
    ];
  }

  if (data === 404) {
    const currentDate: any = new Date();
    const now = Date.parse(currentDate);
    const timesCheck = Date.parse(date);
    return (
      <>
        {timesCheck > now ? (
          <Typography mt={10} textAlign={"center"} fontSize={"1.1rem"}>
            Looks like your checking the future... Try again with a another date
          </Typography>
        ) : (
          <Typography mt={10} textAlign={"center"} fontSize={"1.1rem"}>
            Oops! It looks like we couldn&apos;t find what you&apos;re searching for. Please double-check the stock symbol and/or {date} to ensure
            it&apos;s available
          </Typography>
        )}
      </>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {options && sequence && (
        <>
          <Typography variant={"h1"} textAlign={"center"} fontSize={"1.5rem"}>
            Stock of {stocksLegend.map((name: any) => name[data.symbol] ?? data.symbol)}
          </Typography>
          <Typography fontSize={"1rem"} textAlign={"center"}>
            Daily Open and close of {issueDate(data.from)}
          </Typography>
          <Chart options={options} series={sequence} type="bar" />
        </>
      )}
    </div>
  );
};

export default Graph;
