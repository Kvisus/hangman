import styles from "../Keyboard.module.css";
import { useEffect, useState } from "react";

interface KeyboardProps {
  addGuessedLetter: (letter: string) => void;
  activeLetters: string[];
  inactiveLetters: string[];
  disabled?: boolean;
}

const Keyboard = ({
  addGuessedLetter,
  activeLetters,
  inactiveLetters,
  disabled = false,
}: KeyboardProps) => {
  const [keys, setKeys] = useState(() => getKeys());
  // * Get all letters in alphabet
  function getKeys() {
    const a = Array.from(Array(26)).map((element, index) => index + 65);
    const keys = a.map((x) => String.fromCharCode(x).toLowerCase());
    // console.log(keys);
    return keys;
  }
  // let KEYS;

  // useEffect(() => {
  //   KEYS = getKeys();
  // }, []);

  return (
    <div className="keyboard">
      {keys.map((key) => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);
        return (
          <button
            className={`${styles.button} ${isActive ? styles.active : ""} ${
              isInactive ? styles.inactive : ""
            }`}
            key={key}
            onClick={() => addGuessedLetter(key)}
            disabled={isActive || isInactive || disabled}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};
export default Keyboard;
