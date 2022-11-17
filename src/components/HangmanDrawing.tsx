const HEAD = <div className="head" />;

const BODY = <div className="body" />;

const RIGHT_ARM = <div className="arm right" />;
const LEFT_ARM = <div className="arm left" />;
const RIGHT_LEG = <div className="leg right" />;
const LEFT_LEG = <div className="leg left" />;

interface HangmanDrawingProps {
  numberOfGuesses: number;
}

const BODYPARTS = [HEAD, BODY, LEFT_ARM, RIGHT_ARM, LEFT_LEG, RIGHT_LEG];

const HangmanDrawing = ({ numberOfGuesses }: HangmanDrawingProps) => {
  return (
    <div className="draw-wrapper">
      {BODYPARTS.slice(0, numberOfGuesses)}
      <div className="vertical-small" />
      <div className="top-horizon" />
      <div className="vertical-high" />
      <div className="bot-horizontal" />
    </div>
  );
};
export default HangmanDrawing;
