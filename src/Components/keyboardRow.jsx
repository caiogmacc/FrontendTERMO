import React from "react";
import KeyboardButton from "./key";

const KeyBoardRow = ({ keysArray, handleKeyboardClick, enteredLetters }) => {
  return (
    <div className="keyboardRow">
      {keysArray.length === 7 && (
        <KeyboardButton
          keyLetter="enter"
          handleKeyboardClick={handleKeyboardClick}
        ></KeyboardButton>
      )}
      {keysArray.map((letter, index) => {
        return (
          <KeyboardButton
            key={index}
            keyLetter={letter}
            handleKeyboardClick={handleKeyboardClick}
            enteredLetters={enteredLetters}
          />
        );
      })}
      {keysArray.length === 7 && (
        <KeyboardButton
          keyLetter="backspace"
          handleKeyboardClick={handleKeyboardClick}
        ></KeyboardButton>
      )}
    </div>
  );
};

export default KeyBoardRow;
