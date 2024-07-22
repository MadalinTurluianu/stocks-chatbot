import { useCallback, useState } from "react";
import { IoMdSend } from "react-icons/io";
import styles from "./styles.module.css";

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
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={styles.input}
      />
      <button
        type="submit"
        className={styles.button}
        disabled={value.trim() === ""}
      >
        <IoMdSend />
      </button>
    </form>
  );
}
