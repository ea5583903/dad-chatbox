import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [lastJoke, setLastJoke] = useState(null); // Track the last joke
  const [talkTo, setTalkTo] = useState('Dad'); // Track who the user is talking to

  const handleSend = () => {
    if (input.trim() === '') return;

    // Add user message
    const userMessage = { sender: 'You', text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Generate response
    const response = talkTo === 'Dad' ? generateDadResponse(input) : generateMomResponse(input);
    const responseMessage = { sender: talkTo, text: response };
    setMessages((prev) => [...prev, responseMessage]);

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
      "Measure twice, cut once.",
      "If something's worth doing, it's worth doing right.",
      "Never trust a ladder. They're always up to something.",
    ];

    const funFacts = [
      "Did you know? Honey never spoils.",
      "Bananas are berries, but strawberries aren't.",
      "Octopuses have three hearts.",
      "A group of flamingos is called a 'flamboyance.'",
      "The Eiffel Tower can be 15 cm taller during the summer.",
    ];

    // Randomly choose a response type
    const responseTypes = ['joke', 'advice', 'funFact'];
    const responseType = responseTypes[Math.floor(Math.random() * responseTypes.length)];

    let response;
    if (responseType === 'joke') {
      // Filter out the last joke
      const filteredJokes = jokes.filter((joke) => joke !== lastJoke);
      const newJoke = filteredJokes[Math.floor(Math.random() * filteredJokes.length)];
      setLastJoke(newJoke); // Update the last joke
      response = `Here's a dad joke for you: ${newJoke}`;
    } else if (responseType === 'advice') {
      response = `Here's some dad advice: ${advice[Math.floor(Math.random() * advice.length)]}`;
    } else if (responseType === 'funFact') {
      response = `Fun fact: ${funFacts[Math.floor(Math.random() * funFacts.length)]}`;
    }

    return response;
  };

  const generateMomResponse = (userInput) => {
    const encouragements = [
      "You're doing great, sweetie!",
      "Don't forget to take breaks and rest.",
      "I'm so proud of you!",
      "Remember, you can achieve anything you set your mind to.",
      "Always believe in yourself.",
    ];

    const tips = [
      "Keep your workspace tidy for better focus.",
      "A good night's sleep is the key to productivity.",
      "Don't forget to eat your vegetables!",
      "Always be kind to others.",
      "Stay organized and plan ahead.",
    ];

    const funFacts = [
      "Did you know? A baby kangaroo is called a joey.",
      "Butterflies can taste with their feet.",
      "The moon has moonquakes.",
      "A group of kittens is called a kindle.",
      "Tomatoes are fruits, not vegetables.",
    ];

    // Randomly choose a response type
    const responseTypes = ['encouragement', 'tip', 'funFact'];
    const responseType = responseTypes[Math.floor(Math.random() * responseTypes.length)];

    let response;
    if (responseType === 'encouragement') {
      response = `Here's some mom encouragement: ${encouragements[Math.floor(Math.random() * encouragements.length)]}`;
    } else if (responseType === 'tip') {
      response = `Here's a mom tip: ${tips[Math.floor(Math.random() * tips.length)]}`;
    } else if (responseType === 'funFact') {
      response = `Fun fact: ${funFacts[Math.floor(Math.random() * funFacts.length)]}`;
    }

    return response;
  };

  return (
    <div className="App">
      <h1>Parent Talker</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === talkTo ? 'parent' : 'user'}`}>
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
        <button onClick={handleReset} style={{ marginLeft: '10px' }}>Reset</button>
      </div>
      <div className="toggle-box">
        <label>
          Talk to:
          <select value={talkTo} onChange={(e) => setTalkTo(e.target.value)} style={{ marginLeft: '10px' }}>
            <option value="Dad">Dad</option>
            <option value="Mom">Mom</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default App;
