"use client";

import { Box, Typography } from "@mui/material";
import styled from "styled-components";

const TopLine = () => {
  const Container = styled(Box)`
    margin: 4rem auto;
    padding: 1rem 0;
    width: 80vw;
    max-width: 500px;
  `;

  const Title = styled(Typography)`
    &::first-letter {
      font-size: 2em;
      color: #85bb65;
      font-weight: bold;
    }
  `;

  return (
    <Container>
      <Title variant="h1" textAlign={"center"} fontSize={"2.3rem"}>
        Stock Price Tracker
      </Title>
      <Typography textAlign={"center"}>
        Enter your favourite company&apos;s symbol {"\n"}or select it from the dropdown.{"\n"} Insert the date, and access the result!
      </Typography>
    </Container>
  );
};

export default TopLine;
