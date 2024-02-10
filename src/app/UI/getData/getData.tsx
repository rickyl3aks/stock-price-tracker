"use client";

import { Button, TextField, Stack } from "@mui/material";
import React, { useState } from "react";
import Graph from "../graph/graph";

interface Result {
  stocksTicker: string;
  multiplier: string;
  timeSpan: string;
  from: string;
  to: string;
  sortValue: string;
}

const GetData = ({ setRes, children }: any) => {
  const sort = ["Ascending Order", "Descending Order"];

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
    multiplier: "",
    timeSpan: "",
    from: "",
    to: "",
    sortValue: "",
  });
  const [result, setResult] = useState<string | Result>("");
  const [data, setData] = useState<string | Result>("");

  const handleChange = (key: keyof Result) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [key]: event.target.value });
  };

  const handleButtonClick = () => {
    const dateFormatRegex = /^\d{4}\-\d{2}\-\d{2}$/;

    const { stocksTicker, multiplier, timeSpan, from, to, sortValue } = values;
    if (!dateFormatRegex.test(from) || !dateFormatRegex.test(to)) {
      setResult("Date format is incorrect, please insert YYYY-MM-DD");
      return;
    }
    if (!stocksTicker || !multiplier || !timeSpan || !from || !to || !sortValue || !dateFormatRegex.test(from) || !dateFormatRegex.test(to)) {
      setResult("All fields are required");
    } else {
      setResult({
        ...values,
        sortValue: sortValue === "Ascending Order" ? "asc" : "desc",
      });
    }
  };

  return (
    <>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" gap={1}>
        {Object.entries(values).map(
          ([key, value], index, array) =>
            index !== array.length - 1 && (
              <TextField
                key={key}
                value={value}
                onChange={handleChange(key as keyof Result)}
                InputLabelProps={inputLabelProps}
                sx={{ ...inputSxProps, width: "100%" }}
                id={`outlined-${key}`}
                label={key === "from" || key === "to" ? key + " YYYY-MM-DD" : key.charAt(0).toUpperCase() + key.slice(1)}
                variant="outlined"
              />
            )
        )}
        <TextField
          value={values.sortValue}
          onChange={handleChange("sortValue")}
          InputLabelProps={inputLabelProps}
          sx={{ ...inputSxProps, width: "100%" }}
          id="outlined-basic"
          select
          variant="outlined"
          SelectProps={{
            native: true,
            style: { color: "#1E90FF" },
          }}
        >
          {sort.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </TextField>
      </Stack>
      <Button variant="contained" onClick={handleButtonClick}>
        Get Result
      </Button>
      <Graph res={result} />
    </>
  );
};

export default GetData;
