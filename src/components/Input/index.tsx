import { useCallback, useState } from "react";

type InputProps = {
  placeholder: string;
  onSubmit: (message: string) => void;
};

export function Input({ placeholder, onSubmit }: InputProps) {
  const [value, setValue] = useState("");

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit?.(value.trim());
      setValue("");
    },
    [onSubmit, value]
  );

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder={placeholder} value={value} onChange={handleChange} />
      <button type="submit">Send</button>
    </form>
  );
}
