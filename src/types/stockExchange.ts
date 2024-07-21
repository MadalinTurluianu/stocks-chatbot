import { Stock } from "./stock";

export type StockExchange = {
  code: string;
  stockExchange: string;
  topStocks: Stock[];
};
