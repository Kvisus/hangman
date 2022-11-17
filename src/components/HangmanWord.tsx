interface HangmanWordProps {
  guessedLetters: string[];
  wordToGuess: string;
  reveal?: boolean;
}

const HangmanWord = ({
  wordToGuess,
  guessedLetters,
  reveal = false,
}: HangmanWordProps) => {
  return (
    <div className="word-container">
      {wordToGuess.split("").map((letter, index) => {
        return (
          <span className={"letter-container "} key={index}>
            <span
              className={`${
                guessedLetters.includes(letter) || reveal ? "visible" : "hidden"
              }`}
              style={{
                color:
                  !guessedLetters.includes(letter) && reveal ? "red" : "black",
              }}
            >
              {letter}
            </span>
          </span>
        );
      })}
    </div>
  );
};
export default HangmanWord;
