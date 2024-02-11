"use client";

import Link from "next/link";
import { ThemeButton } from "../theme/theme";
import { Stack, styled } from "@mui/material";

export const Navigation = () => {
  const List = styled("ul")`
    text-decoration: none;
    list-style-type: none;
  `;
  return (
    <Stack direction={"row"} justifyContent={"flex-end"}>
      <ThemeButton />
    </Stack>
  );
};
