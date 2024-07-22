import { MouseEventHandler, useCallback, useState } from "react";
import { Message } from "@/types/message";
import { Input } from "../Input";
import { MessagesList } from "../MessagesList";
import { UserMessage } from "../UserMessage";
import { BotMessage } from "../BotMessage";
import { useBot } from "@/hooks/useBot";
import { VscRobot } from "react-icons/vsc";
import styles from "./styles.module.css";

export function Chat() {
  const { initialOptions, ask } = useBot();
  const [messages, setMessages] = useState<Message[]>([
    {
      key: Date.now().toString() + "bot",
      element: (
        <BotMessage
          message="Hello! Welcome to LSEG. I'm here to help you."
          options={initialOptions}
        />
      ),
    },
  ]);

  const sendMessage = useCallback(
    (message: string) => {
      const botAnswer = ask(message);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          key: Date.now().toString() + "user",
          element: <UserMessage message={message} />,
          user: true,
        },
        {
          key: Date.now().toString() + "bot",
          element: (
            <BotMessage message={botAnswer.text} options={botAnswer.options} />
          ),
        },
      ]);
    },
    [ask]
  );

  const suggestionClickHandler = useCallback<MouseEventHandler<HTMLElement>>(
    (event) => {
      const target = event.target as HTMLLIElement;
      if (!target.dataset.suggestion || target.textContent == null) return;
      sendMessage(target.textContent);
    },
    [sendMessage]
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <VscRobot size={25} />
        <span>LSEG chatbot</span>
      </header>
      <main className={styles.chat} onClick={suggestionClickHandler}>
        <MessagesList messages={messages} />
      </main>
      <footer className={styles.input}>
        <Input placeholder="Please pick an option." onSubmit={sendMessage} />
      </footer>
    </div>
  );
}
