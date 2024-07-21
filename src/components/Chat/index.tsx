import { useCallback, useState } from "react";
import { Message } from "@/types/message";
import { Input } from "../Input";
import { MessagesList } from "../MessagesList";
import { MyMessage } from "../MyMessage";

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = useCallback((message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        key: Date.now().toString(),
        element: <MyMessage message={message} />,
        mine: true,
      },
    ]);
  }, []);

  return (
    <div>
      <MessagesList messages={messages} />
      <Input placeholder="Please pick an option." onSubmit={sendMessage} />
    </div>
  );
}
