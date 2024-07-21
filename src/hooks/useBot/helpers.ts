import { Stock } from "@/types/stock";
import { StockExchange } from "@/types/stockExchange";
import { answerMessages } from "./constants";

type GetAvailableAnswersProps = {
  stocksData: StockExchange[];
  stockExchange: StockExchange | null;
  stock: Stock | null;
};

export function getAvailableAnswers({
  stocksData,
  stockExchange,
  stock,
}: GetAvailableAnswersProps) {
  const answers: string[] = [];

  if (stockExchange == null) {
    stocksData.forEach((item) => {
      answers.push(item.stockExchange);
    });
  }

  if (stockExchange != null && stock == null) {
    const exchange = stocksData.find(
      (item) => item.stockExchange == stockExchange.stockExchange
    );
    exchange?.topStocks.forEach((item) => {
      answers.push(item.stockName);
    });
  }

  if (stockExchange != null) {
    answers.push(answerMessages.goMainMenu);
  }

  if (stock != null) {
    answers.push(answerMessages.goBack);
  }

  return answers;
}
