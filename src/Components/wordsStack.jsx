import React from "react";
import Word from "./word";

const WordsStack = ({ palavraArray, solution }) => {
  return (
    <div className="stack">
      {palavraArray.map((word, index) => {
        return <Word word={word} key={index} solution={solution} />
      })}
    </div>
  );
};

export default WordsStack;
