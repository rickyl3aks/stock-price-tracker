import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers";
import { Navigation } from "./UI/navigation/navigation";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tech Stocks",
  description: "Stock API with real-time and historical tick data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          <header>
            <nav>
              <Navigation />
            </nav>
          </header>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
