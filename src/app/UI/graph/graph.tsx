import { fetchStockData } from "@/APIcalls/apiCall";
import { useQuery } from "react-query";
import Chart from "react-apexcharts";
import { StockResults } from "@/model/model";

const Graph = ({ res }: any) => {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => fetchStockData("AAPL", "1", "day", "2024-01-02", "2024-01-02", "asc"),
    queryKey: ["todos"],
  });

  let options: any = null;
  let serie = null;

  if (data) {
    const updatedResults = data.results.map((result: any) => {
      const { n, v, t, ...updatedResult } = result;
      return updatedResult;
    });

    const updatedData = {
      ...data,
      results: updatedResults,
    };

    const keyMapping: StockResults = {
      // v: "Volume",
      vw: "Volume Weighted Average",
      o: "Open Price",
      c: "Close Price",
      h: "Highest Price",
      l: "Lowest Price",
      // n: "Number of Transactions",
    };
    const categories = updatedData.results.flatMap((key: string) =>
      Object.keys(key).map((initialKey) => keyMapping[initialKey as keyof StockResults])
    );
    const series = updatedData.results.flatMap((value: string) => Object.values(value));

    options = {
      chart: {
        type: "bar",
        width: "100%",
        height: 380,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "80%",
        },
      },
      xaxis: {
        categories: categories,
      },
      responsive: [
        {
          breakpoint: 1000,
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

    serie = [
      {
        name: data?.ticker,
        data: series,
      },
    ];
  }

  // if (!res) {
  //   return <div>Please try again...</div>;
  // }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{options && serie && <Chart options={options} series={serie} type="bar" />}</div>;
};

export default Graph;
