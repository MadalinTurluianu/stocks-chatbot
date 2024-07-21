type UserMessageProps = {
  message: string;
};

export function UserMessage({ message }: UserMessageProps) {
  return <p>{message}</p>;
}
