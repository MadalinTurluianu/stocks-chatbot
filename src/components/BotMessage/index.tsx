type BotMessageProps = {
  message: string;
  options: string[];
};

export function BotMessage({ message, options }: BotMessageProps) {
  return (
    <div>
      <p>{message}</p>
      <ul>
        {options.map((option) => (
          <li>{option}</li>
        ))}
      </ul>
    </div>
  );
}
