import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [lastJoke, setLastJoke] = useState(null); // Track the last joke

  const handleSend = () => {
    if (input.trim() === '') return;

    // Add user message
    const userMessage = { sender: 'You', text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Generate dad response
    const dadResponse = generateDadResponse(input);
    const dadMessage = { sender: 'Dad', text: dadResponse };
    setMessages((prev) => [...prev, dadMessage]);

    setInput('');
  };

  const handleReset = () => {
    setMessages([]); // Clear all messages
    setInput(''); // Reset input field
    setLastJoke(null); // Reset last joke
  };

  const generateDadResponse = (userInput) => {
    const jokes = [
      "I'm afraid for the calendar. Its days are numbered.",
      "Why don't skeletons fight each other? They don't have the guts.",
      "What do you call cheese that isn't yours? Nacho cheese.",
      "Why couldn't the bicycle stand up by itself? It was two tired.",
      "What did the ocean say to the beach? Nothing, it just waved.",
    ];

    const advice = [
      "Always remember to stay hydrated.",
      "Don't forget to call your mom.",
      "Take breaks while working to avoid burnout.",
      "Be kind to others, it costs nothing.",
      "Always look both ways before crossing the street.",
    ];

    // Randomly decide between joke or advice
    const isJoke = Math.random() > 0.5;

    if (isJoke) {
      // Filter jokes to avoid repeating the last joke
      const filteredJokes = jokes.filter((joke) => joke !== lastJoke);
      const newJoke = filteredJokes[Math.floor(Math.random() * filteredJokes.length)];
      setLastJoke(newJoke); // Update last joke
      return newJoke;
    } else {
      // Return random advice
      return advice[Math.floor(Math.random() * advice.length)];
    }
  };

  return (
    <div className="App">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === 'You' ? 'user' : 'dad'}`}>
            <strong>{message.sender}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
