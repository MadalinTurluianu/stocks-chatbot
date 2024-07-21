import { Message } from "@/types/message";

type MessagesListProps = {
  messages: Message[];
};

export function MessagesList({ messages }: MessagesListProps) {
  return (
    <ul>
      {messages?.map((item) => (
        <li key={item.key}>{item.element}</li>
      ))}
    </ul>
  );
}
