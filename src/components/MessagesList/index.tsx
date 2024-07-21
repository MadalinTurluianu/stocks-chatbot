import { Message } from "@/types/message";

type MessagesListProps = {
  messages: Message[];
};

export function MessagesList({ messages }: MessagesListProps) {
  return (
    <ul>
      {messages?.map((item) => (
        <li key={item.key} style={{ color: item.mine ? "red" : "blue" }}>{item.element}</li>
      ))}
    </ul>
  );
}
