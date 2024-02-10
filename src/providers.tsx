"use client";

import { ThemeProvider } from "next-themes";
import { useIsMounted } from "./app/isMounted/isMouted";
import { QueryClient, QueryClientProvider } from "react-query";

export const Providers = ({ children }: any) => {
  const queryClient = new QueryClient();

  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </ThemeProvider>
    </>
  );
};
