import React from "react";

function PopUp({
  handleNewWordle,
  isRunning,
  currentStreak,
  maxStreak,
  gamesPlayed,
}) {
  let view = isRunning ? "none" : "block";
  return (
    <div className="popUp" style={{ display: view }}>
      <h1>Estatísticas do jogo</h1>
      <table>
        <tbody>
          <tr>
            <th>Sequência Atual</th>
            <th>Sequência máxima</th>
            <th>Partidas disputadas</th>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>{currentStreak}</td>
            <td>{maxStreak}</td>
            <td>{gamesPlayed}</td>
          </tr>
        </tbody>
      </table>
      <button className="new-wordle-button" onClick={() => handleNewWordle()}>
      Nova Palavra
      </button>
    </div>
  );
}

export default PopUp;
