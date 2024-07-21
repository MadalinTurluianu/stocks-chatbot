import { useCallback, useState } from "react";
import { StockExchange } from "@/types/stockExchange";
import { Stock } from "@/types/stock";
import stocksDataJSON from "../../assets/data/stock-data.json";
import { getAvailableAnswers } from "./helpers";
import { answerMessages } from "./constants";

type Answer = {
  text: string;
  options: string[];
};

const noResultText = "Please select a valid option.";
const selectStockExchangeText = "Please select a Stock Exchange.";
const selectStockText = "Please select a Stock.";

const stocksData: StockExchange[] = JSON.parse(stocksDataJSON.toString());

export function useBot() {
  const [stockExchange, setStockExchange] = useState<StockExchange | null>(
    null
  );
  const [stock, setStock] = useState<Stock | null>(null);

  const ask = useCallback(
    (message: string): Answer => {
      const availableAnswers = getAvailableAnswers({
        stockExchange,
        stock,
        stocksData,
      });

      const answer = availableAnswers.find(
        (item) => item.toLowerCase() === message.toLowerCase()
      );

      if (answer == null) {
        return {
          text: noResultText,
          options: availableAnswers,
        };
      }

      if (answer === answerMessages.goMainMenu) {
        return {
          text: selectStockExchangeText,
          options: getAvailableAnswers({
            stocksData,
            stockExchange: null,
            stock: null,
          }),
        };
      }

      if (answer === answerMessages.goBack) {
        return {
          text: selectStockText,
          options: getAvailableAnswers({
            stocksData,
            stockExchange,
            stock: null,
          }),
        };
      }

      return {
        text: answer,
        options: availableAnswers,
      };
    },
    [stock, stockExchange]
  );

  return { ask };
}
