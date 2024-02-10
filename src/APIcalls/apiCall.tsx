export type StocksProps = {
  stocksTicker: string;
  multiplier: string;
  from: string;
  to: string;
};

export const fetchStockData = async (stocksTicker: string, multiplier: string, timespan: string, from: string, to: string, sort: string) => {
  const res = await fetch(
    `https://api.polygon.io/v2/aggs/ticker/${stocksTicker}/range/${multiplier}/${timespan}/${from}/${to}?adjusted=true&sort=${sort}&limit=120&apiKey=${process.env.NEXT_PUBLIC_POLYGON__API_KEY}`
  );
  if (!res.ok) {
    return "There has been an error, please try again in a few minutes";
  }
  return res.json();
};
