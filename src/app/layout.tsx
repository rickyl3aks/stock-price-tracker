import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers";
import { Navigation } from "./UI/navigation/navigation";
import { Roboto } from "next/font/google";
import TopLine from "./UI/topLine/topLine";
import Footer from "./UI/footer/footer";

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
          <div style={{ margin: "0.2rem" }}>
            <header>
              <nav>
                <Navigation />
              </nav>
              <TopLine />
            </header>
            <main>{children}</main>
          </div>
          <footer style={{ position: "relative", height: "50vh" }}>
            <Footer />
          </footer>
        </Providers>
      </body>
    </html>
  );
}
