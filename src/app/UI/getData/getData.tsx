"use client";

import { Button, TextField, Stack, MenuItem, Typography, Box } from "@mui/material";
import { useState } from "react";
import Graph from "../graph/graph";
import React from "react";
import { maxRestriction, minRestriction } from "@/app/restriction/restriction";
import { stocks } from "@/model/model";

interface Result {
  stocksTicker: string;
  date: string;
}

const GetData = () => {
  const inputLabelProps = {
    style: { color: "#1E90FF" },
  };

  const inputSxProps = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#1E90FF",
      },
      "&:hover fieldset": {
        borderColor: "#1E90FF",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1E90FF",
      },
    },
  };

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

  return (
    <>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" sx={{ width: "60vw", margin: "auto" }} gap={1}>
        <TextField
          select
          key="select a ticker"
          value={values.stocksTicker}
          onChange={handleChange("stocksTicker")}
          InputLabelProps={inputLabelProps}
          sx={{ ...inputSxProps, width: "100%" }}
          id="outlined-stocksTicker"
          label="Select a Ticker"
          variant="outlined"
        >
          {Object.keys(stocks[0]).map((symbol: string) => (
            <MenuItem key={symbol} value={symbol}>
              {stocks[0][symbol as keyof (typeof stocks)[0]]}
            </MenuItem>
          ))}
        </TextField>
        {Object.entries(values).map(([key, value], index, array) => (
          <React.Fragment key={key}>
            <TextField
              key={key}
              value={value}
              type={key === "date" ? "date" : undefined}
              onChange={handleChange(key as keyof Result)}
              inputProps={{ min: minRestriction(), max: maxRestriction() }}
              InputLabelProps={inputLabelProps}
              sx={{ ...inputSxProps, width: "100%" }}
              id={`outlined-${key}`}
              label={key === "date" ? "" : key.charAt(0).toUpperCase() + key.slice(1)}
              variant="outlined"
            />
          </React.Fragment>
        ))}
      </Stack>
      <Box textAlign="center" m={5}>
        <Button variant="contained" onClick={handleButtonClick}>
          Get Result
        </Button>
      </Box>
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
