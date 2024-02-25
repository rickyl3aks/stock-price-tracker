"use client";

import Link from "next/link";
import { ThemeButton } from "../theme/theme";
import { Box, Stack, styled } from "@mui/material";
import Header from "@/app/header/header";

export const Navigation = () => {
  const List = styled("ul")`
    text-decoration: none;
    list-style-type: none;
  `;
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Box>
        <Header />
      </Box>
      <Box mt={1} mr={1}>
        <ThemeButton />
      </Box>
    </Stack>
  );
};
