"ue client";

import { Box, Stack, Typography, styled } from "@mui/material";
import Chart from "react-apexcharts";

const PriceChange = ({ stockData }: any) => {
  const priceChange = stockData.close - stockData.open;

  const percentageChange = ((stockData.close - stockData.open) / stockData.open) * 100;

  const priceData = [stockData.open, stockData.close, stockData.high, stockData.low];
  const meanPrice = priceData.reduce((acc, curr) => acc + curr, 0) / priceData.length;
  const priceRange = Math.max(...priceData) - Math.min(...priceData);
  const volume = stockData.volume;

  const options = {
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "50%",
          background: "#293450",
        },
        track: {
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.15,
          },
        },
        dataLabels: {
          name: {
            offsetY: -10,
            color: "#fff",
            fontSize: "18px",
          },
          value: {
            color: "#fff",
            fontSize: "14px",
            show: true,
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "vertical",
              gradientToColors: ["#87D4F9"],
            },
          },
          stroke: {
            lineCap: "round",
          },
          total: {
            show: true,
            fontSize: "10px",
            label: "MEAN PRICE",
            color: "#b0b8bb",
          },
        },
      },
    },
  };

  const meanPricePercentage = ((meanPrice - Math.min(...priceData)) / (Math.max(...priceData) - Math.min(...priceData))) * 100;

  const series: any = [meanPricePercentage.toFixed(2)];

  const Title = styled(Typography)`
    color: #000;
    font-weight: bold;
  `;

  const Number = styled("span")`
    font-size: 0.8rem;
    color: #1f98f4;
  `;

  return (
    <div>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent={"space-between"} alignItems={"center"}>
        <Box>
          <Title>
            Price Change: <Number>{priceChange.toFixed(2)}</Number>
          </Title>
          <Title>
            Percentage: <Number>{percentageChange.toFixed(2)}%</Number>
          </Title>
          <Title>
            Mean Price: <Number>{meanPrice.toFixed(2)}</Number>
          </Title>
          <Title>
            Price Range: <Number>{priceRange.toFixed(2)}</Number>
          </Title>
          <Title>
            Volume: <Number>{volume}</Number>
          </Title>
        </Box>
        <Chart options={options} series={series} type="radialBar" />
      </Stack>
    </div>
  );
};

export default PriceChange;
