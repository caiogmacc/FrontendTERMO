import React from "react";

const Quadradinho = ({ letter, colorState, word, index }) => {
  let delay = (index * 500).toString().concat(" ", "ms");
  let classes = "Quadradinho";
  if (letter !== " ") {
    classes = "Quadradinho letter-entry-animation";
    setTimeout(() => (classes = "Quadradinho"), 210);
  }
  if (word.submitted) {
    classes = "Quadradinho flip";
    setTimeout(() => (classes = "Quadradinho"), 510);
  }
  const styles = {
    default: {
      backgroundColor: "transparent",
      border: `4.5px solid ${letter !== " " ? "#4C4347" : "#4C4347"}`,
      width: "7.3vh",
      height: "7.3vh",
    },
    right: {
      backgroundColor: "#3AA394",
      transition: `background-color ${delay}ms`,
    },
    semiRight: {
      backgroundColor: "#D3AD69",
      transition: `background-color ${delay}ms`,
    },
    wrong: {
      backgroundColor: "#312A2C",
      transition: `background-color ${delay}ms`,
    },
  };
  let styling =
    colorState === "right"
      ? styles.right
      : colorState === "semiRight"
      ? styles.semiRight
      : colorState === "wrong"
      ? styles.wrong
      : styles.default;
  return (
    <div style={styling} className={classes}>
      {letter.toUpperCase()}
    </div>
  );
};

export default Quadradinho;
