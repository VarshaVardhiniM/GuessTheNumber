import React, { useState } from 'react';
import './GuessTheNumber.css';
import confetti from 'canvas-confetti'; // 🎉 Import confetti

function GuessTheNumber() {
  const [target, setTarget] = useState(generateRandom());
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Start guessing...');
  const [attempts, setAttempts] = useState(0);
  const [bestScore, setBestScore] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);

  function generateRandom() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleGuess = () => {
  const num = parseInt(guess);
  if (isNaN(num) || num < 1 || num > 100) {
    setMessage('⚠️ Please enter a number between 1 and 100!');
    return;
  }

  setAttempts(prev => prev + 1);

  const difference = Math.abs(num - target);

  if (num === target) {
    setMessage(`🎉 Correct! You guessed it in ${attempts + 1} tries.`);
    setIsCorrect(true);
    triggerConfetti();

    if (!bestScore || attempts + 1 < bestScore) {
      setBestScore(attempts + 1);
    }
  } else if (num < target) {
    if (difference <= 5) {
      setMessage('😮 Almost! Just a bit higher.');
    } else {
      setMessage('😢 Too low! Try a higher number.');
    }
  } else {
    if (difference <= 5) {
      setMessage('😮 Almost! Just a bit lower.');
    } else {
      setMessage('😢 Too high! Try a lower number.');
    }
  }
};


  const resetGame = () => {
    setTarget(generateRandom());
    setGuess('');
    setMessage('New game started! Start guessing...');
    setAttempts(0);
    setIsCorrect(false);
  };

  return (
    <div className={`game-container ${isCorrect ? 'success' : ''}`}>
      <h2>Guess the Number Game</h2>
      <p>I'm thinking of a number between 1 and 100</p>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter your guess"
        className="guess-input"
      />
      <br />
      <button onClick={handleGuess} className="btn guess-btn">Guess</button>
      <button onClick={resetGame} className="btn reset-btn">Reset</button>
      <p className="message">{message}</p>

      <div className="scoreboard">
        <p>Attempts: <strong>{attempts}</strong></p>
        <p>Best Score: <strong>{bestScore || '~'}</strong></p>
      </div>
    </div>
  );
}

export default GuessTheNumber;
