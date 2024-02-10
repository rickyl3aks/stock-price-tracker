"use client";

import { useTheme } from "next-themes";
import LightModeIcon from "@mui/icons-material/LightMode";
import { DarkMode } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useIsMounted } from "@/app/isMounted/isMouted";

export const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  const Btn = styled("button")`
    background-color: #bbb;
    border: none;
    padding: 0.3rem;
    border-radius: 50%;
    display: inline-block;

    &:hover {
      cursor: pointer;
    }
  `;

  return (
    <Btn onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      {resolvedTheme === "dark" ? (
        <span title="light mode">
          <LightModeIcon />
        </span>
      ) : (
        <span title="dark mode">
          <DarkMode />
        </span>
      )}
    </Btn>
  );
};
