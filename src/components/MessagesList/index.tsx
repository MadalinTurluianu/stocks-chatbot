import { Message } from "@/types/message";
import styles from "./styles.module.scss";
import { useEffect, useRef } from "react";

type MessagesListProps = {
  messages: Message[];
};

export function MessagesList({ messages }: MessagesListProps) {
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!list.current) return;
    list.current.scrollTop = list.current?.scrollHeight;
  }, [messages.length]);

  return (
    <ul className={styles.list} ref={list}>
      {messages?.map((item) => (
        <li key={item.key} className={item.user ? styles.user : ""}>
          {item.element}
        </li>
      ))}
    </ul>
  );
}
