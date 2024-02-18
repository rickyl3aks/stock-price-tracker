import { dailyOpen } from "@/APIcalls/apiCall";
import Chart from "react-apexcharts";
import { DailyStock, stocksLegend } from "@/model/model";
import { Box, Typography } from "@mui/material";
import { issueDate } from "../issueDate/issueDate";
import { useQuery } from "react-query";
import React from "react";
import PriceChange from "../priceChange/priceChange";

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
        height: 350,
        width: "100%",
        background: "#fff",
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 3,
          barHeight: "60%",
        },
      },
      title: {
        text: stocksLegend.map((name: any) => name[data.symbol] ?? data.symbol),
        align: "center",
        style: {
          fontSize: "25px",
          fontWeight: "bold",
        },
      },
      legend: {
        show: true,
      },
      tooltip: {
        theme: "dark",
        style: {
          fontSize: "18px",
        },
        marker: {
          show: true,
        },
      },
      noData: {
        text: "Loading...",
      },
      dataLabels: {
        style: {
          fontSize: "18px",
        },
      },
      fill: {
        colors: ["#F44336"],
      },
      xaxis: {
        categories: categories,

        labels: {
          style: {
            fontSize: "18px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "18px",
          },
        },
      },
      responsive: [
        {
          breakpoint: 1000,
          options: {
            chart: {
              height: "400px",
            },
            xaxis: {
              labels: {
                style: {
                  fontSize: "10px",
                },
              },
            },
            yaxis: {
              categories: categories,
              labels: {
                style: {
                  fontSize: "10px",
                },
              },
            },
            dataLabels: {
              style: {
                fontSize: "10px",
              },
            },
            plotOptions: {
              bar: {
                horizontal: false,
              },
            },
            legend: {
              position: "bottom",
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

  return (
    <div>
      {options && sequence && (
        <React.Fragment>
          <Typography variant={"h1"} textAlign={"center"} fontSize={"1.5rem"}>
            Stock of {stocksLegend.map((name: any) => name[data.symbol] ?? data.symbol)}
          </Typography>
          <Typography fontSize={"1rem"} mb={3} textAlign={"center"}>
            Daily Open and close of {issueDate(data.from)}
          </Typography>
          <Box sx={{ width: { md: "50rem" }, margin: "auto" }}>
            <PriceChange stockData={data} />
            <Chart options={options} series={sequence} type="bar" />
          </Box>
        </React.Fragment>
      )}
    </div>
  );
};

export default Graph;
