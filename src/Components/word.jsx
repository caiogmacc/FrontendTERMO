import React from "react";
import Quadradinho from "./Quadradinho";

const Word = ({ word, solution }) => {
  if (word.content.length < 5) {
    word.content += " ".repeat(5 - word.content.length);
  }
  let color = "";
  let tempSolution = solution.split("");
  return (
    <div className="word">
      {word.content.split("").map((letter, index) => {
        if (word.content.split("").filter((l) => l == letter).length > 1) {
          tempSolution = tempSolution.filter((k) => k == letter);
          color = !word.submitted
            ? "default"
            : solution[index] === letter
            ? "right"
            : tempSolution.join("")
            ? "semiRight"
            : "wrong";
          tempSolution.pop();
        } else {
          color = !word.submitted
            ? "default"
            : solution[index] === letter
            ? "right"
            : solution.includes(letter)
            ? "semiRight"
            : "wrong";
        }

        return (
          <Quadradinho
            letter={letter ? letter : " "}
            key={index}
            colorState={color}
            word={word}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default Word;
