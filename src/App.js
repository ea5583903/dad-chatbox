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

  const generateDadResponse = (userInput) => {
    const jokes = [
      "I'm afraid for the calendar. Its days are numbered.",
      "Why don't skeletons fight each other? They don't have the guts.",
      "What do you call cheese that isn't yours? Nacho cheese.",
      "Why couldn't the bicycle stand up by itself? It was two tired.",
      "What did the ocean say to the beach? Nothing, it just waved.",
    ];

    // Filter out the last joke
    const filteredJokes = jokes.filter((joke) => joke !== lastJoke);

    // Select a new joke
    const newJoke = filteredJokes[Math.floor(Math.random() * filteredJokes.length)];
    setLastJoke(newJoke); // Update the last joke

    // Acknowledge the user's input
    const acknowledgments = [
      "That's interesting!",
      "Oh, really?",
      "Good one!",
      "Haha, I see what you did there.",
      "Hmm, let me think about that.",
    ];

    const acknowledgment = acknowledgments[Math.floor(Math.random() * acknowledgments.length)];
    return `${acknowledgment} Here's a dad joke for you: ${newJoke}`;
  };

  return (
    <div className="App">
      <h1>Dad Talker</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'Dad' ? 'dad' : 'user'}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default App;
