"use client";

import { Box, Typography } from "@mui/material";
import styled from "styled-components";

const TopLine = () => {
  const Container = styled(Box)`
    margin: 4rem auto;
    padding: 1rem 0;
  `;

  const Header = styled("span")`
    color: #224128;
  `;

  const Title = styled(Typography)`
    color: #000;
  `;

  return (
    <Container>
      <Title variant="h1" textAlign="left" fontSize={{ xs: "35px", sm: "45px" }} fontWeight={"bold"}>
        <Header>STOCK DATA</Header> Open, Close, and Afterhours Prices on Any Date
      </Title>
      <Typography mt={2} color="#000" textAlign={"left"} fontSize={{ xs: "18px", sm: "20px" }} fontFamily={"Raleway"}>
        Enter the <Header>STOCK SYMBOL</Header> of your preferred company or opt for it from the dropdown list. Insert the date, and access the
        result!
      </Typography>
    </Container>
  );
};

export default TopLine;
