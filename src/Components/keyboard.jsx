import React from "react";
import KeyBoardRow from "./keyboardRow";

const Keyboard = ({ handleKeyboardClick, enteredLetters }) => {
  const firstRow = "qwertyuiop".split("");
  const secondRow = "asdfghjkl".split("");
  const thirdRow = "zxcvbnm".split("");
  const rows = [firstRow, secondRow, thirdRow];
  return (
    <div className="keyboard">
      {rows.map((row, index) => {
        return (
          <KeyBoardRow
            handleKeyboardClick={handleKeyboardClick}
            keysArray={row}
            key={index}
            enteredLetters={enteredLetters}
          />
        );
      })}
    </div>
  );
};

export default Keyboard;
