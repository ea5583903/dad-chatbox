import React, { useState } from 'react';
import './App.css';

const COLORS = ['Red', 'Green', 'Blue', 'Yellow'];
const VALUES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+2'];

function generateDeck() {
  const deck = [];
  COLORS.forEach((color) => {
    VALUES.forEach((value) => {
      deck.push({ color, value });
      if (value !== '0') {
        deck.push({ color, value }); // Each card (except 0) appears twice
      }
    });
  });
  return deck.sort(() => Math.random() - 0.5); // Shuffle the deck
}

function App() {
  const [deck, setDeck] = useState(generateDeck());
  const [player1Hand, setPlayer1Hand] = useState(deck.slice(0, 7));
  const [player2Hand, setPlayer2Hand] = useState(deck.slice(7, 14));
  const [currentCard, setCurrentCard] = useState(deck[14]);
  const [remainingDeck, setRemainingDeck] = useState(deck.slice(15));
  const [currentPlayer, setCurrentPlayer] = useState(1); // 1 for Player 1, 2 for Player 2
  const [usedMomResponses, setUsedMomResponses] = useState([]); // Track used Mom responses

  const drawCard = () => {
    if (remainingDeck.length === 0) {
      alert('No more cards in the deck!');
      return;
    }
    const newCard = remainingDeck[0];
    if (currentPlayer === 1) {
      setPlayer1Hand([...player1Hand, newCard]);
    } else {
      setPlayer2Hand([...player2Hand, newCard]);
    }
    setRemainingDeck(remainingDeck.slice(1));
  };

  const playCard = (index) => {
    if (currentPlayer === 1) {
      const cardToPlay = player1Hand[index];
      if (cardToPlay.color === currentCard.color || cardToPlay.value === currentCard.value) {
        setCurrentCard(cardToPlay);
        setPlayer1Hand(player1Hand.filter((_, i) => i !== index));
        switchTurn();
      } else {
        alert('Invalid move! Card must match color or value.');
      }
    } else {
      const cardToPlay = player2Hand[index];
      if (cardToPlay.color === currentCard.color || cardToPlay.value === currentCard.value) {
        setCurrentCard(cardToPlay);
        setPlayer2Hand(player2Hand.filter((_, i) => i !== index));
        switchTurn();
      } else {
        alert('Invalid move! Card must match color or value.');
      }
    }
  };

  const switchTurn = () => {
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  const generateMomResponse = () => {
    const allResponses = [
      "You're doing great, sweetie!",
      "Don't forget to take breaks and rest.",
      "I'm so proud of you!",
      "Remember, you can achieve anything you set your mind to.",
      "Always believe in yourself.",
      "Keep your workspace tidy for better focus.",
      "A good night's sleep is the key to productivity.",
      "Don't forget to eat your vegetables!",
      "Always be kind to others.",
      "Stay organized and plan ahead.",
      "Did you know? A baby kangaroo is called a joey.",
      "Butterflies can taste with their feet.",
      "The moon has moonquakes.",
      "A group of kittens is called a kindle.",
      "Tomatoes are fruits, not vegetables.",
    ];

    // Filter out used responses
    const availableResponses = allResponses.filter(
      (response) => !usedMomResponses.includes(response)
    );

    if (availableResponses.length === 0) {
      // Reset used responses if all have been used
      setUsedMomResponses([]);
      return "I've shared everything I know for now. Let's start over!";
    }

    // Select a random response
    const response =
      availableResponses[Math.floor(Math.random() * availableResponses.length)];

    // Add the response to the used list
    setUsedMomResponses((prev) => [...prev, response]);

    return response;
  };

  return (
    <div className="App">
      <h1>Uno Online!</h1>
      <div>
        <h2>Current Card</h2>
        <div id="current-card">
          {currentCard.color} {currentCard.value}
        </div>
      </div>
      <div>
        <h2>{currentPlayer === 1 ? "Player 1's Turn" : "Player 2's Turn"}</h2>
        <div id="player-hand">
          {(currentPlayer === 1 ? player1Hand : player2Hand).map((card, index) => (
            <div
              key={index}
              className={`card ${card.color.toLowerCase()}`}
              onClick={() => playCard(index)}
            >
              {card.color} {card.value}
            </div>
          ))}
        </div>
      </div>
      <button onClick={drawCard} style={{ marginTop: '20px' }}>
        Draw Card
      </button>
      <div style={{ marginTop: '40px' }}>
        <h2>Leaderboard</h2>
        <div>
          <p>Player 1: {player1Hand.length} cards</p>
          <p>Player 2: {player2Hand.length} cards</p>
        </div>
      </div>
    </div>
  );
}

export default App;
