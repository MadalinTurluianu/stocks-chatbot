import styles from "./styles.module.css";

type UserMessageProps = {
  message: string;
};

export function UserMessage({ message }: UserMessageProps) {
  return (
    <div className={styles.message}>
      <span>{message}</span>
    </div>
  );
}
