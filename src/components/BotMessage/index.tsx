import styles from "./styles.module.css";
import { VscRobot } from "react-icons/vsc";

type BotMessageProps = {
  message: string;
  options: string[];
};

export function BotMessage({ message, options }: BotMessageProps) {
  return (
    <div className={styles.container}>
      <VscRobot />
      <div className={styles.message}>
        <span>{message}</span>
        <ul>
          {options.map((option) => (
            <li data-suggestion={true}>{option}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
