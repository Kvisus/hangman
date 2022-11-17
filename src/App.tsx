import { useCallback, useEffect, useState } from "react";
import words from "./wordList.json";
import "./App.css";
import Keyboard from "./components/Keyboard";
import HangmanDrawing from "./components/HangmanDrawing";
import HangmanWord from "./components/HangmanWord";

const getWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

const App = () => {
  //state
  const [wordToGuess, setWordToGuess] = useState(() => getWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );
  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  // const addGuessedLetter = (letter: string) => {
  //   if (guessedLetters.includes(letter)) return;
  // setGuessedLetters((currentLetters) => [...currentLetters, letter]);

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };
    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  // on ENTER new game
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (key !== "Enter") return;
      e.preventDefault();
      setGuessedLetters([]);

      
      setWordToGuess(getWord());
    };
    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  return (
    <div className="main">
      <div className="loose-win">
        {isWinner ? "Winner-winner, chicken dinner" : ""}
        {isLoser ? "Nice try, better luck next time" : ""}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      <Keyboard
        activeLetters={guessedLetters.filter((letter) =>
          wordToGuess.includes(letter)
        )}
        inactiveLetters={incorrectLetters}
        addGuessedLetter={addGuessedLetter}
        disabled={isLoser || isWinner}
      />
    </div>
  );
};
export default App;
