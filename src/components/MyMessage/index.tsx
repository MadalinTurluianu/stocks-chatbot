type MyMessageProps = {
  message: string;
};

export function MyMessage({ message }: MyMessageProps) {
  return <p>{message}</p>;
}
