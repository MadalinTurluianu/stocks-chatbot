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

const stocksData: StockExchange[] = stocksDataJSON;

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

      // Go to main menu is always available after selecting a stock exchange
      // We will redirect the user to the select stock exchange menu
      if (answer === answerMessages.goMainMenu) {
        setStockExchange(null);
        setStock(null);
        return {
          text: selectStockExchangeText,
          options: getAvailableAnswers({
            stocksData,
            stockExchange: null,
            stock: null,
          }),
        };
      }

      // Go back in present just when we already selected a stock
      // We will redirect the user to the select stock menu
      if (answer === answerMessages.goBack) {
        setStock(null);
        return {
          text: selectStockText,
          options: getAvailableAnswers({
            stocksData,
            stockExchange,
            stock: null,
          }),
        };
      }

      // The user needs to select a stock exchange
      if (stockExchange == null) {
        const stockExchangeFound = stocksData.find(
          (item) => item.stockExchange === answer
        );

        if (stockExchangeFound == null) {
          return {
            text: noResultText,
            options: availableAnswers,
          };
        }

        setStockExchange(stockExchangeFound);
        return {
          text: selectStockText,
          options: getAvailableAnswers({
            stocksData,
            stockExchange: stockExchangeFound,
            stock: null,
          }),
        };
      }

      // The user needs to select a stock
      if (stock == null) {
        const stockFound = stockExchange.topStocks.find(
          (item) => item.stockName === answer
        );

        if (stockFound == null) {
          return {
            text: noResultText,
            options: availableAnswers,
          };
        }

        setStock(stockFound);
        return {
          text: `Stock Price of ${stockFound.stockName} is ${stockFound.price}. Please select an option.`,
          options: getAvailableAnswers({
            stocksData,
            stockExchange: stockExchange,
            stock: stockFound,
          }),
        };
      }

      // The stock was already selected and the answer is nether go back or go main menu
      return {
        text: noResultText,
        options: getAvailableAnswers({
          stocksData,
          stockExchange,
          stock,
        }),
      };
    },
    [stock, stockExchange]
  );

  return {
    ask,
    initialOptions: getAvailableAnswers({
      stocksData,
      stock: null,
      stockExchange: null,
    }),
  };
}
