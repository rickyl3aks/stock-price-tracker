"use client";

import { Button, TextField, MenuItem, Typography, Box, ThemeProvider, createTheme, styled, Grid, useMediaQuery } from "@mui/material";
import { useState } from "react";
import Graph from "../graph/graph";
import React from "react";
import { maxRestriction, minRestriction } from "@/app/restriction/restriction";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { stocks } from "@/model/model";

interface Result {
  stocksTicker: string;
  date: string;
}

const GetData = () => {
  const [values, setValues] = useState<Result>({
    stocksTicker: "",
    date: "",
  });
  const [result, setResult] = useState<string | Result>("");

  const handleChange = (key: keyof Result) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [key]: event.target.value });
  };

  const handleButtonClick = () => {
    const dateFormatRegex = /^\d{4}\-\d{2}\-\d{2}$/;

    const { stocksTicker, date } = values;
    if (!dateFormatRegex.test(date)) {
      setResult("Date format is incorrect, please insert YYYY-MM-DD");
      return;
    }
    if (!stocksTicker || !date || !dateFormatRegex.test(date)) {
      setResult("All fields are required");
    } else {
      setResult({
        ...values,
      });
    }
  };

  const inputLabelProps = {
    style: { color: "rgba(0, 0, 0, 0.87)" },
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(99, 96, 92)",
      },
      secondary: {
        main: "#1c3421",
      },
    },
  });

  const inputSxProps = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        backgroundColor: "rgba(99, 96, 92, 0.5)",
      },
      "&:hover fieldset": {
        backgroundColor: "rgba(99, 96, 92, 0.5)",
      },
      "&.Mui-focused fieldset": {
        backgroundColor: "rgba(99, 96, 92, 0.5)",
      },
    },
  };

  const inputSxCalendar = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        backgroundColor: "rgba(99, 96, 92, 0.5)",
      },
      "&:hover fieldset": {
        backgroundColor: "rgba(99, 96, 92, 0.5)",
      },
      "&.Mui-focused fieldset": {
        backgroundColor: "rgba(99, 96, 92, 0.5)",
      },
    },
  };

  const IconContainer = styled(Box)`
    width: 2.5rem;
    height: 2.5rem;
    background-color: #1c3421;
    border-radius: 10px;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    position: absolute;
    top: -28px;
    left: 50%;
    transform: translateX(-50%);
  `;

  const Container = styled(Box)`
    position: relative;
  `;

  const Btn = styled(Button)`
    background-color: "#1c3421";
  `;

  const icons = { position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid
          container
          justifyContent="space-evenly"
          alignItems="center"
          sx={{
            maxWidth: "90vw",
            margin: "auto",
            boxShadow: {
              xs: "none",
              sm: "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
            },
          }}
        >
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              marginTop: { xs: 5, sm: 0 },
            }}
          >
            <Container
              sx={{
                boxShadow: {
                  xs: "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
                  sm: "none",
                },
              }}
            >
              <IconContainer>
                <ShowChartIcon sx={{ ...icons }} />
              </IconContainer>
              <TextField
                select
                key="select a ticker"
                color="primary"
                value={values.stocksTicker}
                onChange={handleChange("stocksTicker")}
                InputLabelProps={inputLabelProps}
                sx={{ ...inputSxProps, width: "100%" }}
                id="outlined-stocksTicker"
                label="Select a Ticker"
                variant="filled"
              >
                {Object.keys(stocks[0]).map((symbol: string) => (
                  <MenuItem key={symbol} value={symbol}>
                    {stocks[0][symbol as keyof (typeof stocks)[0]]}
                  </MenuItem>
                ))}
              </TextField>
            </Container>
          </Grid>
          {Object.entries(values).map(([key, value], index, array) => (
            <Grid key={key} item xs={12} sm={4} sx={{ marginTop: { xs: 5, sm: 0 } }}>
              <Container
                sx={{
                  boxShadow: {
                    xs: "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
                    sm: "none",
                  },
                }}
              >
                <IconContainer>{key === "date" ? <CalendarMonthIcon sx={{ ...icons }} /> : <ShowChartIcon sx={{ ...icons }} />} </IconContainer>
                <TextField
                  color="primary"
                  key={key}
                  value={value}
                  type={key === "date" ? "date" : undefined}
                  onChange={handleChange(key as keyof Result)}
                  inputProps={{ min: minRestriction(), max: maxRestriction() }}
                  InputLabelProps={inputLabelProps}
                  sx={{ ...inputSxCalendar, width: "100%", zIndex: 10 }}
                  id={`outlined-${key}`}
                  label={key === "date" ? "" : key.charAt(0).toUpperCase() + key.slice(1)}
                  variant="filled"
                />
              </Container>
            </Grid>
          ))}
        </Grid>
        <Box textAlign={{ xs: "center", sm: "left" }} mt={3}>
          <Button color="secondary" variant="contained" onClick={handleButtonClick} sx={{ width: { xs: "100%", sm: "auto" } }}>
            Get Result
          </Button>
        </Box>
      </ThemeProvider>
      {result && typeof result === "string" ? (
        <Typography textAlign={"center"} m={3}>
          {result}
        </Typography>
      ) : (
        result && <Graph key={JSON.stringify(result)} res={result as Result} />
      )}
    </>
  );
};

export default GetData;
