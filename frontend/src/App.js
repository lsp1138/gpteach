import React, { useState } from "react";
import Chat from "./components/Chat";
//import axios from "axios";

function App() {
  const [chatEntries, setChatEntries] = useState([]);

  function onUserInput(question, botResponse) {
    setChatEntries([
      ...chatEntries,
      {
        question: question,
        botResponse: botResponse,
      },
    ]);
  }

  return (
    <main className="container">
      <h1 className="text-black text-uppercase text-center my-4">
        Teach prompt app
      </h1>
      <Chat chatEntries={chatEntries} onUserInput={onUserInput} />
    </main>
  );
}

export default App;
