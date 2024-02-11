export type StocksProps = {
  stocksTicker: string;
  multiplier: string;
  from: string;
  to: string;
};

export const fetchStockData = async (stocksTicker: string, from: string, to: string, sort: string) => {
  const res = await fetch(
    `https://api.polygon.io/v2/aggs/ticker/${stocksTicker}/range/1/day/${from}/${to}?adjusted=true&sort=${sort}&limit=120&apiKey=${process.env.NEXT_PUBLIC_POLYGON__API_KEY}`
  );
  if (!res.ok) {
    return res;
  }
  return res.json();
};

export const dailyOpen = async (stocksTicker: string, date: string) => {
  const res = await fetch(
    `https://api.polygon.io/v1/open-close/${stocksTicker}/${date}?adjusted=true&apiKey=${process.env.NEXT_PUBLIC_POLYGON__API_KEY}`
  );
  if (!res.ok) {
    return res.status;
  }
  return res.json();
};
